import React, { useEffect, useState } from "react";
import NewsCard from "../components/accidentNewsCompo/NewsCard";
import Header from "../components/accidentNewsCompo/Header";
import HighlightNews from "../components/accidentNewsCompo/HighlightNews";

const AccidentNews = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch News (Mock or API)
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
  try {
    const res = await fetch(
      `https://gnews.io/api/v4/search?q=accident&lang=en&max=10&apikey=b7a83481b1ee4f400f65c29902b78d5d`
    );

  const data = await res.json();

    console.log("API Response:", data); // 👈 DEBUG

    if (!data.articles) {
      console.error("No articles found");
      setLoading(false);
      return;
    }

    const formatted = data.articles.map((item) => ({
      title: item.title,
      location: item.source.name,
      date: item.publishedAt?.split("T")[0],
      description: item.description || "No description available",
      url: item.url,
      image: item.image,
    }));

    setNews(formatted);
    setFilteredNews(formatted);
    setLoading(false);
  } catch (err) {
    console.error("Fetch Error:", err);
    setLoading(false);
  }
};
  // 🔍 Search Filter
  useEffect(() => {
  const result = news.filter((item) =>
    (
      item.title +
      item.description +
      item.location
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

    setFilteredNews(result);
    }, [search, news]);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <Header />

      {/* Search */}
      <div className="p-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by city..."
          className="w-1/2 p-2 rounded shadow"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Highlight */}
      {!loading && filteredNews.length > 0 && (
        <HighlightNews news={filteredNews[0]} />
      )}

      {/* News List */}
      <div className="p-6 grid gap-6">
        {loading ? (
          <p className="text-center">Loading news...</p>
        ) : (
          filteredNews.map((item, index) => (
            <NewsCard key={index} data={item} />
          ))
        )}
      </div>

    </div>
  );
};

export default AccidentNews;