import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from "recharts";

const DashboardPage = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [search, setSearch] = useState("");

  // ---------------- DATA ----------------
  const tableData = [
    { country: "India", state: "UP", district: "Lucknow", deaths: 12, date: "2023-05-01", time: "8PM" },
    { country: "India", state: "Delhi", district: "Delhi", deaths: 8, date: "2023-05-02", time: "6PM" },
    { country: "India", state: "MH", district: "Mumbai", deaths: 15, date: "2023-05-03", time: "9PM" },
  ];

  const filtered = tableData.filter((d) =>
    d.district.toLowerCase().includes(search.toLowerCase())
  );

  const trendData = [
    { name: "Jan", value: 800 },
    { name: "Feb", value: 950 },
    { name: "Mar", value: 1100 },
    { name: "Apr", value: 1000 },
  ];

  const pieData = [
    { name: "Over-speeding", value: 60 },
    { name: "Drunk", value: 20 },
    { name: "Weather", value: 10 },
    { name: "Others", value: 10 },
  ];

  // ---------------- UI ----------------
  return (
    <div className="bg-gradient-to-br from-[#eef2ff] via-white to-[#fdf2f8] min-h-screen p-8">

      <div className="max-w-[1400px] mx-auto space-y-10">

        {/* 🔥 HERO */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-10 rounded-3xl shadow-xl">
          <h1 className="text-5xl font-bold mb-3">Welcome Back 👋</h1>
          <p className="opacity-90">
            Analyze accident trends, risk zones, and insights with smart data.
          </p>
        </div>

        {/* 🔥 CTA */}
        {!showDashboard && (
          <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
            <h2 className="text-2xl font-semibold mb-4">
              See Accident Analysis in India
            </h2>
            <button
              onClick={() => setShowDashboard(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-3 rounded-xl"
            >
              View Dashboard →
            </button>
          </div>
        )}

        {/* 🔥 MAIN DASHBOARD */}
        {showDashboard && (
          <div className="bg-white rounded-3xl shadow-xl p-8 space-y-10">

            {/* 🎛 FILTER BAR */}
            <div className="flex flex-wrap gap-4 justify-between">
              <div className="flex gap-3 flex-wrap">
                <select className="input">India</select>
                <select className="input">2023</select>
                <select className="input">All Months</select>
                <select className="input">
                  <option>All Vehicles</option>
                  <option>Car</option>
                  <option>Bike</option>
                </select>
              </div>
              <button className="btn-secondary">Reset</button>
            </div>

            {/* 🔥 KPI */}
            <div className="grid md:grid-cols-4 gap-6">
              <KPI title="Total Accidents" value="12,450" color="from-red-400 to-red-600" />
              <KPI title="Total Deaths" value="3,200" color="from-purple-400 to-purple-600" />
              <KPI title="Avg / Month" value="1,020" color="from-blue-400 to-blue-600" />
              <KPI title="Growth" value="+12% ↑" color="from-green-400 to-green-600" />
            </div>

            {/* 🔥 CHARTS */}
            <div className="grid md:grid-cols-3 gap-6">

              {/* LINE */}
              <ChartCard title="Trend">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={trendData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line dataKey="value" stroke="#6366f1" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* PIE */}
              <ChartCard title="Causes">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value">
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={["#6366f1","#f59e0b","#10b981","#ef4444"][i]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* BAR */}
              <ChartCard title="Vehicles">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={trendData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            {/* 🗺 MAP */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl text-center">
              <h2 className="font-semibold mb-2">Accident Heatmap</h2>
              <p className="text-gray-500">Map integration here (Leaflet)</p>
            </div>

            {/* 🔥 TABLE */}
            <div>
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Accident Records</h2>
                <input
                  className="input"
                  placeholder="Search district..."
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th>Country</th>
                    <th>State</th>
                    <th>District</th>
                    <th>Deaths</th>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, i) => (
                    <tr key={i} className="border-b text-center">
                      <td>{row.country}</td>
                      <td>{row.state}</td>
                      <td>{row.district}</td>
                      <td>{row.deaths}</td>
                      <td>{row.date}</td>
                      <td>{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 🔥 INSIGHTS */}
            <div className="bg-yellow-50 p-6 rounded-2xl">
              <p>
                🚨 Accidents increased by <b>12%</b>. Peak time is <b>6PM–9PM</b>.
                Over-speeding is the major cause.
              </p>
            </div>
          </div>
        )}

        {/* 🔥 NEWS */}
        {showDashboard && (
          <div className="bg-white p-8 rounded-3xl shadow-xl">
            <h2 className="text-xl font-semibold mb-6">Latest Updates</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <News title="Highway Crash" />
              <News title="Traffic Alert" />
              <News title="City Accident" />
            </div>
          </div>
        )}

        {/* 🔥 FOOTER */}
        {showDashboard && (
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-2xl flex justify-between">
            <button>← Home</button>
            <button>Traffic Rules →</button>
          </div>
        )}

      </div>
    </div>
  );
};

// ---------------- COMPONENTS ----------------

const KPI = ({ title, value, color }) => (
  <div className={`bg-gradient-to-r ${color} text-white p-6 rounded-2xl shadow`}>
    <p>{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-gray-50 p-4 rounded-2xl">
    <h3 className="mb-2 font-semibold">{title}</h3>
    {children}
  </div>
);

const News = ({ title }) => (
  <div className="bg-gray-50 p-4 rounded-xl">
    <h3 className="font-semibold">{title}</h3>
    <p className="text-sm text-gray-500">Latest update about accidents</p>
  </div>
);

// reusable styles
const input = "border px-3 py-2 rounded-lg";

export default DashboardPage;