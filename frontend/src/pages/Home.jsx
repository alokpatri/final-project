import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import LiveStats from "../components/LiveStats";
import Section4 from "../components/Section4";
import Features from "../components/Features";
import NewsSection from "../components/NewsSection";
import Testimonial from "../components/Testimonial";
import Footer from "../components/Footer";
import Login from "./Login";
import Register from "./Register";
import ContactUs from "../components/ContactUs";

function Home() {

  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // 🔥 control mode

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      const timer = setTimeout(() => {
        setShowAuth(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="relative">

      {/* Background blur */}
      <div className={showAuth ? "blur-sm pointer-events-none" : ""}>
        <Navbar />
        <LiveStats />
        <Section4 />
        <Features />
        <NewsSection />
        <Testimonial />
        <ContactUs />
        <Footer />
      </div>

      {/* 🔐 AUTH MODAL */}
      {showAuth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative z-50 w-full max-w-md animate-scaleIn">

            {authMode === "login" ? (
              <Login
                isModal={true}
                onClose={() => setShowAuth(false)}
                switchToRegister={() => setAuthMode("register")}
              />
            ) : (
              <Register
                isModal={true}
                onClose={() => setShowAuth(false)}
                switchToLogin={() => setAuthMode("login")}
              />
            )}

          </div>

        </div>
      )}

    </div>
  );
}

export default Home;