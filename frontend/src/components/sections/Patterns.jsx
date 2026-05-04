import SectionWrapper from "../common/SectionWrapper";
import {
  LineChart,
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Line,
} 
from "recharts";import { mapData } from "../../utils/chart";

export default function Patterns({ data }) {

  const hourly = Object.entries(data.hourly || {}).map(([k,v])=>({
    hour: k,
    count: v
  }));

  const locations = Object.entries(data.top_locations || {}).map(([k,v])=>({
    name: k,
    value: v
  }));

  return (
    <SectionWrapper title="Pattern Detection" isLoading={!data}>

      <div className="grid grid-cols-2 gap-4">

        {/* TIME PATTERN */}
        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="font-semibold mb-2">Accidents by Hour</h3>

          <LineChart width={400} height={250} data={hourly}>
            <XAxis dataKey="hour"/>
            <YAxis/>
            <Tooltip/>
            <Line dataKey="count"/>
          </LineChart>
        </div>

        {/* LOCATION HOTSPOTS */}
        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="font-semibold mb-2">Top Locations</h3>

          <BarChart width={400} height={250} data={locations}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="value"/>
          </BarChart>
          <BarChart data={mapData(data.hourly)} />
          <PieChart data={mapData(data.vehicle)} />
        </div>

      </div>

    </SectionWrapper>
  );
}