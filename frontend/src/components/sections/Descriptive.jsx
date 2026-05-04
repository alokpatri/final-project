import React from "react";
import { BarChart, PieChart } from "recharts";
import { mapData } from "../../utils/chart";

export default function Descriptive({ data }) {
  return (
    <div className="bg-white p-4 rounded-xl">
      <h2>Descriptive Insights</h2>
      <p>Most common severity: {data.top_severity}</p>
      <BarChart data={mapData(data.monthly)} />
      <BarChart data={mapData(data.daily)} />
      <PieChart data={mapData(data.severity)} />
    </div>
  );
}