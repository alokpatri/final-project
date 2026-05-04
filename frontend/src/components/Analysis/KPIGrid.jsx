import Card from "../common/Card";
import { FaCarCrash, FaSkull, FaHeartbeat } from "react-icons/fa";
import { PieChart, Pie, Tooltip } from "recharts";

export default function KPIGrid({ data }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card
        title="Total Accidents"
        value={data.total_accidents}
        icon={<FaCarCrash />}
      />
      <Card
        title="Fatality Rate"
        value={data.fatality_rate}
        change={-2.3}
        icon={<FaSkull />}
      />
      <Card
        title="Injury Rate"
        value={data.injury_rate}
        change={1.2}
        icon={<FaHeartbeat />}
      />
      <Card
        title="Risk Score"
        value={data.risk_score}
      />
      <div>
        <PieChart width={300} height={250}>
          <Pie
            data={Object.entries(data.severity || {}).map(([k,v])=>({name:k,value:v}))}
            dataKey="value"
            nameKey="name"
          />
          <Tooltip/>
        </PieChart>
      </div>

    </div>
  );
}