import React, { useState } from "react";

const NewsCard = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">

      <h2 className="text-lg font-bold">{data.title}</h2>
      <img
        src={data.image}
        alt="news"
        className="w-full h-48 object-cover rounded"
        />

        <a
        href={data.url}
        target="_blank"
        rel="noreferrer"
        className="text-blue-500"
        >
        Read Full News →
        </a>

      <p className="text-sm text-gray-500">
        {data.location} | {data.date}
      </p>

      <p className="mt-2">
        {expanded
          ? data.description
          : data.description.slice(0, 60) + "..."}
      </p>

      <button
        onClick={() => setExpanded(!expanded)}
        className="text-blue-500 mt-2"
      >
        {expanded ? "Show Less" : "Read More"}
      </button>

    </div>
  );
};

export default NewsCard;