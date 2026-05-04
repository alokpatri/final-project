import {
  MapContainer,
  TileLayer,
  useMap,
  CircleMarker,
  Tooltip
} from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import "leaflet.heat";

// 🔥 Heatmap Layer (clean)
function HeatmapLayer({ points, enabled }) {
  const map = useMap();
  const heatRef = useRef(null);

  useEffect(() => {
    const L = window.L;

    // Remove old layer
    if (heatRef.current) {
      map.removeLayer(heatRef.current);
      heatRef.current = null;
    }

    // Add new layer
    if (enabled && points.length > 0) {
      const heat = L.heatLayer(points, {
        radius: 18,
        blur: 25,
        maxZoom: 10,
        gradient: {
          0.2: "blue",
          0.4: "cyan",
          0.6: "lime",
          0.8: "yellow",
          1.0: "red"
        }
      });

      heat.addTo(map);
      heatRef.current = heat;
    }

    return () => {
      if (heatRef.current) {
        map.removeLayer(heatRef.current);
        heatRef.current = null;
      }
    };
  }, [points, enabled, map]);

  return null;
}

export default function Geo({ data }) {
  const [showHeatmap, setShowHeatmap] = useState(true);

  // 🔥 Only lat/lng
  const points = (data.geo || []).map(p => [
    parseFloat(p[0]),
    parseFloat(p[1]),
    1
  ]);

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
      }}
    >
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
          Accident Location Map
        </h2>

        <button
          onClick={() => setShowHeatmap(prev => !prev)}
          style={{
            padding: "8px 14px",
            borderRadius: "8px",
            background: showHeatmap ? "#ef4444" : "#22c55e",
            color: "#fff",
            border: "none",
            cursor: "pointer"
          }}
        >
          {showHeatmap ? "Hide Heatmap" : "Show Heatmap"}
        </button>
      </div>

      <p style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>
        📍 Each point represents an accident location
      </p>

      {/* MAP */}
      <MapContainer
        center={[22.9734, 78.6569]}
        zoom={5}
        style={{ height: "500px", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 🔥 Heatmap */}
        <HeatmapLayer points={points} enabled={showHeatmap} />

        {/* 🔥 Simple location markers */}
        {points.slice(0, 500).map((p, i) => (
          <CircleMarker
            key={i}
            center={[p[0], p[1]]}
            radius={4}
            pathOptions={{
              color: "#3b82f6",
              fillColor: "#3b82f6",
              fillOpacity: 0.7,
              cursor: "pointer"
            }}
            eventHandlers={{
              click: () => {
                const lat = p[0];
                const lng = p[1];

                const url = `https://www.google.com/maps?q=${lat},${lng}`;
                window.open(url, "_blank");
              }
            }}
          >
            <Tooltip>
              📍 Lat: {p[0]} <br />
              📍 Lng: {p[1]} <br />
              🔗 Click to open in Google Maps
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}