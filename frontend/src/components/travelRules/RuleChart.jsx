import {
  BarChart, Bar, XAxis, YAxis, Tooltip
} from "recharts";

export default function RuleChart({ data }) {

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="font-bold mb-4">Violation Analysis</h2>

      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="rule" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="violations" />
      </BarChart>
    </div>
  );
}