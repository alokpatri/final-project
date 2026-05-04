import { useEffect, useState } from "react";
import { BarChart, Bar, Tooltip } from "recharts";
import { mapData } from "../../utils/chart";

export default function Correlation({ data }) {
  const [matrix, setMatrix] = useState([]);

  useEffect(() => {
    setMatrix(data.correlation || []);
  }, [data]);

  return (
    <div className="bg-white p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">Correlation Heatmap</h2>

      <div className="grid grid-cols-5 gap-2">
        {matrix.map((row, i) =>
          row.map((val, j) => (
            <div
              key={`${i}-${j}`}
              className="h-10 flex items-center justify-center text-xs"
              style={{
                backgroundColor: `rgba(0,0,255,${Math.abs(val)})`,
              }}
            >
              {val.toFixed(2)}
            </div>
          ))
        )}
      </div>
      <BarChart data={mapData(data.weather_vs_severity)} />
      <BarChart data={mapData(data.age_vs_severity)} />
    </div>
  );
}