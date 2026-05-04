import { useEffect, useState } from "react";
import axios from "axios";

export default function SavedViews({ currentFilters, onLoad }) {

  const [views, setViews] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/get-presets").then(res => {
      setViews(res.data);
    });
  }, []);

  const saveView = async () => {
    await axios.post("http://localhost:5000/save-preset", {
      name,
      filters: currentFilters
    });

    const res = await axios.get("http://localhost:5000/get-presets");
    setViews(res.data);
    setName("");
  };

  return (
    <div className="bg-gray-50 p-4 rounded-xl space-y-2">

      <h3>Saved Dashboards</h3>

      <div className="flex gap-2">
        <input value={name} onChange={(e)=>setName(e.target.value)} />
        <button onClick={saveView}>Save</button>
      </div>

      {views.map(v => (
        <div key={v.id} className="flex justify-between">
          <span>{v.name}</span>
          <button onClick={()=>onLoad(v.filters)}>Load</button>
        </div>
      ))}

    </div>
  );
}