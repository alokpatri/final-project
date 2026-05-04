import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const NewsSection = () => {

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();

    // 🔄 Auto refresh every 5 min
    const interval = setInterval(fetchNews, 300000);
    return () => clearInterval(interval);

  }, []);

  const fetchNews = async () => {
      try {
        const res = await fetch(
          "https://gnews.io/api/v4/search?q=accident&lang=en&max=4&apikey=b7a83481b1ee4f400f65c29902b78d5d"
        );

        const data = await res.json();

        if (!data.articles) return;

        const formatted = data.articles.map((item) => ({
          title: item.title,
          desc: item.description || "No description available",
          image: item.image || "https://via.placeholder.com/400",
          date: item.publishedAt?.split("T")[0],
          url: item.url
        }));

        setNews(formatted);

      } catch (err) {
        console.log("News API error:", err);
      }
    };

  // 🔥 Skeleton Loader
    if (!news || news.length === 0) {
      return <p className="text-center py-10">Loading news...</p>;
    } else if (loading) {
    return (
      <div className="py-12 px-6">
        <div className="max-w-7xl mx-auto animate-pulse">
          <div className="h-6 w-60 bg-gray-300 mb-6 rounded"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-[350px] bg-gray-300 rounded-xl"></div>
            <div className="flex flex-col gap-4">
              {[1,2,3].map(i => (
                <div key={i} className="h-24 bg-gray-300 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Latest News & Updates
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* 🔥 Featured News */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300 group">

            <img
              src={news[0]?.image}
              alt="news"
              onError={(e) => e.target.src = "https://via.placeholder.com/400"}
              className="w-full h-[300px] object-cover group-hover:scale-105 transition duration-300"
            />

            <div className="p-5">
              <p className="text-sm text-gray-500">{news[0]?.date}</p>

              <h3 className="text-xl font-bold mt-2 group-hover:text-blue-600 transition">
                {news[0]?.title}
              </h3>

              <p className="text-gray-600 mt-2">
                {news[0]?.desc}
              </p>

              <a
                href={news[0]?.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-blue-600 font-semibold hover:underline"
              >
                Read More →
              </a>
            </div>
          </div>

          {/* 🔹 Small News Cards */}
          <div className="flex flex-col gap-4">
            {news.slice(1).map((item, index) => (
              <div
                key={index}
                className="flex bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group cursor-pointer"
              >
                <img
                  src={item.image}
                  alt="news"
                  onError={(e) => e.target.src = "https://via.placeholder.com/150"}
                  className="w-24 h-24 object-cover group-hover:scale-105 transition"
                />

                <div className="p-3">
                  <p className="text-xs text-gray-500">{item.date}</p>

                  <h4 className="text-sm font-semibold group-hover:text-blue-600 transition">
                    {item.title}
                  </h4>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-500"
                  >
                    Read →
                  </a>
                </div>
              </div>
            ))}

            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
              <Link to="/News">View All News</Link>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default NewsSection;