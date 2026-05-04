import React from "react";

const HighlightNews = ({ news }) => {
  return (
    <div className="bg-red-100 p-4 m-4 rounded shadow">

      <h2 className="text-lg font-bold text-red-600">
        🚨 Breaking Accident
      </h2>

      <h3 className="font-semibold mt-2">{news.title}</h3>
      <p>{news.location} | {news.date}</p>

    </div>
  );
};

export default HighlightNews;