import { useState, useEffect } from "react";
import Select from "react-select";
import { useSearchParams } from "react-router-dom";

export default function DashboardFilters({ onFilterChange, meta }) {

  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    states: [],
    districts: [],
    vehicles: [],
  });

  // ✅ LOAD FROM URL (on page load)
  useEffect(() => {
    if (!meta) return;

    const states = (searchParams.get("states") || "").split(",").filter(Boolean);
    const vehicles = (searchParams.get("vehicles") || "").split(",").filter(Boolean);

    setFilters({
      states: meta.states.filter(s => states.includes(s.value)),
      districts: meta,
      vehicles: meta.vehicles.filter(v => vehicles.includes(v.value)),
    });

  }, [meta]);

  // ✅ UPDATE URL WHEN FILTER CHANGES
  const updateURL = (updated) => {
    const params = {};

    if (updated.states.length)
      params.states = updated.states.map(v => v.value).join(",");

    if (updated.vehicles.length)
      params.vehicles = updated.vehicles.map(v => v.value).join(",");

    setSearchParams(params);
  };

  const updateFilter = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);

    updateURL(updated);

    onFilterChange({
      states: updated.states.map(v => v.value),
      districts: updated.districts.map(v => v.value),
      vehicles: updated.vehicles.map(v => v.value),
    });
  };

  return (
    <div className="grid grid-cols-3 gap-4">

      <Select
        isMulti
        value={filters.states}
        options={meta?.states || []}
        placeholder="States"
        onChange={(v)=>updateFilter("states", v || [])}
      />
      <Select
        isMulti
        value={filters.districts}
        options={meta?.districts || []}
        placeholder="Districts"
        onChange={(v)=>updateFilter("districts", v || [])}
      />

      <Select
        isMulti
        value={filters.vehicles}
        options={meta?.vehicles || []}
        placeholder="Vehicles"
        onChange={(v)=>updateFilter("vehicles", v || [])}
      />

    </div>
  );
}