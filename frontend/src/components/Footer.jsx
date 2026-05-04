import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* LEFT - LOGO + MESSAGE */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            <img src="/images/logo.jpg" alt="imgage" className="w-40 h-40" />
          </h2>
          <p className="text-sm leading-relaxed">
            Analyze accident data, discover safe routes, and make better travel
            decisions using smart insights.
          </p>
        </div>

        {/* CENTER - NAVIGATION */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer"><Link to="/">Home</Link></li>
            <li className="hover:text-white cursor-pointer"><Link to="/dashboard">Dashboards</Link></li>
            <li className="hover:text-white cursor-pointer" 
            onClick={() => {
                document.getElementById("features").scrollIntoView({
                  behavior: "smooth"
                });
                }}
                className="cursor-pointer"
            >
              Services
            </li>
            <li className="hover:text-white cursor-pointer" 
            onClick={() => {
                document.getElementById("contact").scrollIntoView({
                  behavior: "smooth"
                });
              }}
              className="cursor-pointer"
            >
              Contact Us

            </li>
          </ul>
        </div>

        {/* RIGHT - SOCIAL */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Connect with us
          </h3>

          <div className="flex gap-4 text-xl">
            <FaFacebook className="cursor-pointer hover:text-white" />
            <FaInstagram className="cursor-pointer hover:text-white" />
            <FaLinkedin className="cursor-pointer hover:text-white" />
            <FaGithub className="cursor-pointer hover:text-white" />
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="text-center text-sm text-gray-400 mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} SafeRoute. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;