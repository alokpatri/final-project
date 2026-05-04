import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow">

      {/* Logo */}
      <img src="/images/logo.jpg" alt="logo" className="h-10" />

      {/* Title */}
      <h1 className="text-xl font-bold">Accident News</h1>

      {/* Home Button */}
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white px-4 py-1 rounded"
      >
        Home
      </button>

    </div>
  );
};

export default Header;