// 📄 frontend/src/components/filters/GlobalFilters.jsx

import { useEffect, useState, useRef, useCallback } from "react";
import Select from "react-select";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function GlobalFilters({ setData }) {
  const debounceRef = useRef(null);

  const [options, setOptions] = useState({
    states: [],
    vehicles: [],
    weather: [],
  });

  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [selectedWeather, setSelectedWeather] = useState([]);

  const [ageRange, setAgeRange] = useState([0, 100]);
  const [speedRange, setSpeedRange] = useState([0, 150]);

  // ---------------- FETCH FILTER OPTIONS ----------------
  useEffect(() => {
    fetch("http://localhost:5000/filters")
      .then((res) => res.json())
      .then((data) => {
        setOptions({
          states: (data.states || []).map(v => ({ label: v, value: v })),
          vehicles: (data.vehicles || []).map(v => ({ label: v, value: v })),
          weather: (data.weather || []).map(v => ({ label: v, value: v })),
        });
      });
  }, []);

  // ---------------- APPLY FILTERS ----------------
  const applyFilters = useCallback(async () => {
    const res = await fetch("http://localhost:5000/filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        states: selectedStates?.map(s => s.value) || [],
        vehicles: selectedVehicles?.map(v => v.value) || [],
        weather: selectedWeather?.map(w => w.value) || [],
        age_min: ageRange?.[0] ?? 0,
        age_max: ageRange?.[1] ?? 100,
        speed_min: speedRange?.[0] ?? 0,
        speed_max: speedRange?.[1] ?? 150,
      }),
    });

    const data = await res.json();
    setData(data);
  }, [
    selectedStates,
    selectedVehicles,
    selectedWeather,
    ageRange,
    speedRange,
    setData,
  ]);

  // ---------------- DEBOUNCE ----------------
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      applyFilters();
    }, 500);

    return () => clearTimeout(debounceRef.current);
  }, [applyFilters]);

  // ---------------- CLEAR FILTERS ----------------
  const clearFilters = async () => {
    setSelectedStates([]);
    setSelectedVehicles([]);
    setSelectedWeather([]);
    setAgeRange([0, 100]);
    setSpeedRange([0, 150]);

    const res = await fetch("http://localhost:5000/filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        states: [],
        vehicles: [],
        weather: [],
      }),
    });

    const data = await res.json();
    setData(data);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white shadow rounded-xl">

      {/* STATE */}
      <Select
        isMulti
        options={options.states}
        value={selectedStates}
        onChange={setSelectedStates}
        placeholder="Select State"
      />

      {/* VEHICLE */}
      <Select
        isMulti
        options={options.vehicles}
        value={selectedVehicles}
        onChange={setSelectedVehicles}
        placeholder="Select Vehicle"
      />

      {/* WEATHER */}
      <Select
        isMulti
        options={options.weather}
        value={selectedWeather}
        onChange={setSelectedWeather}
        placeholder="Select Weather"
      />

      {/* AGE SLIDER */}
      <div>
        <label className="text-sm">Age Range</label>
        <Slider
          range
          min={0}
          max={100}
          value={ageRange}
          onChange={(val) => setAgeRange(val)}
        />
        <p className="text-xs">{ageRange[0]} - {ageRange[1]}</p>
      </div>

      {/* SPEED SLIDER */}
      <div>
        <label className="text-sm">Speed Range</label>
        <Slider
          range
          min={0}
          max={150}
          value={speedRange}
          onChange={(val) => setSpeedRange(val)}
        />
        <p className="text-xs">{speedRange[0]} - {speedRange[1]}</p>
      </div>

      {/* APPLY */}
      <button
        onClick={applyFilters}
        className="bg-blue-500 text-white rounded-xl px-4 py-2"
      >
        Apply
      </button>

      {/* CLEAR */}
      <button
        onClick={clearFilters}
        className="bg-gray-400 text-white rounded-xl px-4 py-2"
      >
        Clear
      </button>

    </div>
  );
}