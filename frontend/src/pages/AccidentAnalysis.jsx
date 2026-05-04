import { useState } from "react";
import GlobalFilters from "../components/filters/GlobalFilters";
import MainDashboard from "../components/Analysis/MainDashboard";
import Overview from "../components/sections/Overview";
import Descriptive from "../components/sections/Descriptive";
import Patterns from "../components/sections/Patterns";
import Risk from "../components/sections/Risk";
import Correlation from "../components/sections/Correlation";
import Geo from "../components/sections/Geo";
import Insights from "../components/sections/Insights";
import FeedbackForm from "../components/common/FeedbackForm";
import DashboardFooter from "../components/common/DashboardFooter";
import Summary from "../components/sections/Summary";
import UploadSection from "../components/sections/UploadSection";

export default function AccidentDashboard() {

  const [uploaded, setUploaded] = useState(false);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);


  return (
    <div className="bg-gray-100 min-h-screen p-6 space-y-8">

      {/* 1. GLOBAL FILTERS */}
      {!uploaded ? (
          <UploadSection 
            setUploaded={setUploaded} 
            setData={setData} 
            setLoading={setLoading}
          />
        ) : (
          <GlobalFilters setData={setData} />
        )}
      {/* 2. MAIN DASHBOARD */}
      {loading && (
        <div style={{
          textAlign: "center",
          padding: "40px"
        }}>
          <div className="spinner"></div>
          <p>Analyzing data... please wait</p>
        </div>
      )}
      {data && !loading && (
        <div style={{
          background: "#dcfce7",
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "15px",
          color: "#166534"
        }}>
          ✅ Data uploaded and analyzed successfully
        </div>
      )}
      {data?.preview && (
        <div style={{
          background: "#fff",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "20px",
          overflowX: "auto"
        }}>
          <h3>📊 Data Preview</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {Object.keys(data.preview[0]).map((col, i) => (
                  <th key={i} style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.preview.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val, j) => (
                    <td key={j} style={{ padding: "8px" }}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {data && <MainDashboard data={data} setData={setData} />}

      {/* BELOW SECTIONS */}
      {data && (
        <>
          <Overview data={data}  />
          <Descriptive data={data} />
          <Patterns data={data} />
          <Risk data={data} />
          <Correlation data={data} />
          <Geo data={data} />
          <Insights data={data} />
          <Summary data={data} />
        </>
      )}
    
      {/* FEEDBACK + FOOTER */}
      <FeedbackForm />
      <DashboardFooter />
    </div>
  );
}