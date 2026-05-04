import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const LiveStats = () => {
 const [year, setYear] = useState("2023");

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/live-stats")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const data = {
    "2023":{accidents:120000, deaths:45000},
    "2022":{accidents:127300, deaths:90000},
    "2021":{accidents:128430, deaths:45350},
    "2020":{accidents:340000, deaths:53490}
  };

  return (
    <div className="p-6 bg-gray-100 ">
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2">
          <h2 className="text-2xl font-bold mb-4">
            accident analysis
          </h2>
          <img src="/images/livestat3.gif" alt="analytics"
           className="rounded-xl border border-black w-4/5 h-[300px] object-cover"
          />
        </div>

        <div>
          <h2 className="font-bold">India accident stats</h2>
          <select value={year} 
          onChange={(e) => setYear(e.target.value)}
            className="p-2 border rounded-lg mt-2 w-40">
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>

            <div className="flex gap-50">
              <div className="flex-1 bg-blue-100 p-4 mt-10 rounded-xl shadow">
                  <h3 className="text-lg font-semibold">Total Accidents</h3>
                  <p className="text-2xl font-bold mt-2">{data[year]?.accidents?.toLocaleString() || "0"}</p>
              </div>
              <div className="flex-1 bg-blue-100 p-4 mt-10 rounded-xl shadow">
                  <h3 className="text-lg font-semibold">Total Accidents</h3>
                  <p className="text-2xl font-bold mt-2">{data[year]?.deaths?.toLocaleString() || "0"}</p>
              </div>
            </div>
        </div>

      </div>

    </div>
  );
}

export default LiveStats
