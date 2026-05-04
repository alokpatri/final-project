// 📄 frontend/src/utils/chart.js

export const mapData = (obj) =>
  Object.entries(obj || {}).map(([k, v]) => ({
    name: k,
    value: v,
  }));