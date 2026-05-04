import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, ScatterChart, Scatter
} from "recharts";

export default function ChartsGrid({ data }) {

  const hourly = Object.entries(data.hourly || {}).map(([k,v])=>({hour:k,count:v}));
  const severity = Object.entries(data.severity_distribution || {}).map(([k,v])=>({name:k,value:v}));
  const locations = Object.entries(data.top_locations || {}).map(([k,v])=>({name:k,value:v}));

  return (
    <div className="grid grid-cols-3 gap-4">

      {/* LINE CHART */}
      <ChartCard title="Accidents by Hour">
        <LineChart width={300} height={200} data={hourly}>
          <XAxis dataKey="hour"/>
          <YAxis/>
          <Tooltip/>
          <Line dataKey="count"/>
        </LineChart>
      </ChartCard>

      {/* BAR CHART */}
      <ChartCard title="Severity Distribution">
        <BarChart width={300} height={200} data={severity}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
          <Bar dataKey="value"/>
        </BarChart>
      </ChartCard>

      {/* PIE CHART */}
      <ChartCard title="Accident Share">
        <PieChart width={300} height={200}>
          <Pie data={severity} dataKey="value" outerRadius={80}>
            {severity.map((_, i)=><Cell key={i}/>)}
          </Pie>
        </PieChart>
      </ChartCard>

      {/* COLUMN CHART */}
      <ChartCard title="Top Locations">
        <BarChart width={300} height={200} data={locations}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
          <Bar dataKey="value"/>
        </BarChart>
      </ChartCard>

      {/* SCATTER (ADVANCED) */}
      <ChartCard title="Age vs Severity">
        <ScatterChart width={300} height={200}>
          <XAxis dataKey="age"/>
          <YAxis dataKey="severity"/>
          <Tooltip/>
          <Scatter data={data.scatter || []}/>
        </ScatterChart>
      </ChartCard>

    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl shadow">
      <h3 className="mb-2 font-semibold">{title}</h3>
      {children}
    </div>
  );
}