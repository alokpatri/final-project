import { useEffect, useState, useRef } from "react";
import axios from "axios";
import DashboardFilters from "./DashboardFilters";
import ShareButton from "./ShareButton";
import KPIGrid from "./KPIGrid";
import ChartsGrid from "./ChartsGrid";
import SavedViews from "./SavedViews";
import DownloadButton from "./DownloadButton";


export default function MainDashboard({ data, setData }) {

  const [currentFilters, setCurrentFilters] = useState({});

  const [meta, setMeta] = useState(null);
  const debounceRef = useRef(null);
  const cacheRef = useRef({}); // 💾 cache store

  useEffect(() => {
    axios.get("http://localhost:5000/meta").then(res => {
      setMeta(res.data);
    });
  }, []);

  const applyFilters = async (filters) => {
    setCurrentFilters(filters);

    const key = JSON.stringify(filters);

    // 💾 CACHE HIT
    if (cacheRef.current[key]) {
      setData(cacheRef.current[key]);
      return;
    }
    // ⏳ DEBOUNCE
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      const res = await axios.post("http://localhost:5000/filter", filters);

      cacheRef.current[key] = res.data; // save cache
      setData(res.data);

    }, 400);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow space-y-6">
      {data.warnings && data.warnings.length > 0 && (
        <div style={{
          background: "#fff3cd",
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "15px",
          color: "#856404"
        }}>
          {data.warnings.map((w, i) => (
            <div key={i}>{w}</div>
          ))}
        </div>
      )}

      <DashboardFilters onFilterChange={applyFilters} meta={meta} />

      <ShareButton />
      <KPIGrid data={data} />
      <ChartsGrid data={data} />
        <DownloadButton />
      {/* <SavedViews currentFilters={currentFilters} onApply={applyFilters} /> */}
      <SavedViews
        currentFilters={currentFilters}
        onLoad={applyFilters}
      />


    </div>
  );
}