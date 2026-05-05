import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch(
        "https://gnews.io/api/v4/search?q=accident&lang=en&max=5&apikey=b7a83481b1ee4f400f65c29902b78d5d"
      );

      const data = await res.json();

      const formatted = data.articles.map((item) => ({
        title: item.title,
        desc: item.description || "No description",
        image: item.image,
        date: item.publishedAt?.split("T")[0],
      }));

      setNews(formatted);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // ✅ Safety (VERY IMPORTANT)
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading news...
      </div>
    );
  }

  if (!news || news.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No news available
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl font-bold mb-8">
          Latest News & Updates
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* 🔥 Main News */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
            <img
              src={news[0].image}
              alt="news"
              className="w-full h-[300px] object-cover"
            />

            <div className="p-5">
              <p className="text-sm text-gray-500">{news[0].date}</p>
              <h3 className="text-xl font-bold mt-2">
                {news[0].title}
              </h3>
              <p className="text-gray-600 mt-2">
                {news[0].desc}
              </p>
            </div>
          </div>

          {/* 🔹 Side News */}
          <div className="flex flex-col gap-4">
            {news.slice(1).map((item, index) => (
              <div key={index} className="flex bg-white rounded-xl shadow-md overflow-hidden">
                <img
                  src={item.image}
                  alt="news"
                  className="w-24 h-24 object-cover"
                />

                <div className="p-3">
                  <p className="text-xs text-gray-500">{item.date}</p>
                  <h4 className="text-sm font-semibold">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}

            <Link to="/News">
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">
                View All News
              </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NewsSection;