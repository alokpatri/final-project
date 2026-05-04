import React from "react";
import { BarChart3, Zap, Route, ShieldCheck } from "lucide-react";

const Features = () => {
  const features = [
    {
      title: "Explore Dashboard",
      desc: "View detailed analytics and accident data visually.",
      icon: <BarChart3 size={32} />,
    },
    {
      title: "Quick Insights",
      desc: "Get instant insights and trends from real-time data.",
      icon: <Zap size={32} />,
    },
    {
      title: "Safest Route",
      desc: "Find the safest route based on accident-prone areas.",
      icon: <Route size={32} />,
    },
    {
      title: "Smart Alerts",
      desc: "Receive alerts for high-risk zones and traffic conditions.",
      icon: <ShieldCheck size={32} />,
    },
  ];

  return (
    <div id="features" className="bg-gray-100 py-12 px-6">
      
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800">
          Features
        </h2>

        <p className="text-gray-600 mt-2 mb-8">
          We provide many powerful features
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300 hover:scale-105"
            >
              
              <div className="text-blue-600 mb-4 flex justify-center">
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold mb-2">
                {item.title}
              </h3>

              <p className="text-gray-500 text-sm">
                {item.desc}
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default Features;