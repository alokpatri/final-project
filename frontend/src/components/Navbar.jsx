import { useEffect, useState } from "react";
import logoImage from "/images/logo.jpg"
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-sans">

      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-md py-3"
            : "bg-[#0b1c26]/80 backdrop-blur-md py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-lg font-bold">
            <img src={logoImage} alt="Logo" />
            </div>
            <div className={`font-semibold leading-tight ${scrolled ? "text-black" : "text-white"}`}>
              Accident <br /> apps
            </div>
          </div>

          {/* Menu */}
          <ul className={`hidden md:flex gap-8 text-sm font-medium ${scrolled ? "text-black" : "text-white"}`}>
            <li className="hover:text-red-500 cursor-pointer"><Link to="/dashboard">Dashboards</Link></li>
            <li className="hover:text-red-500 cursor-pointer"><Link to="/traveling-rules">Traveling Rules</Link></li>
            <li className="hover:text-red-500 cursor-pointer"><Link to="/News">Accident News</Link></li>
            <li
              onClick={() => {
                document.getElementById("features").scrollIntoView({
                  behavior: "smooth"
                });
                }}
                className="cursor-pointer"
              >
              Services
            </li>
            <li
              onClick={() => {
                document.getElementById("contact").scrollIntoView({
                  behavior: "smooth"
                });
              }}
              className="cursor-pointer"
            >
              Contact Us
            </li>
             {/* <button className="bg-blue-500 text-white px-4 py-2   rounded-lg hover:bg-green-600 transition duration-300">
            <Link to='/StartJourney'>StarJourny</Link>
            </button>  */}
          </ul>
        </div>

        {/* THIN LINE (IMPORTANT) */}
        {!scrolled && (
          <div className="border-t border-white/20 mt-4"></div>
        )}

        {/* for mobile  */}
        <button
          className={`md:hidden text-3xl ${scrolled ? "text-black" : "text-white"}`}
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
        {open && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 md:hidden">
           <p ><Link to="/"> About</Link></p>
           <p><li
              onClick={() => {
                document.getElementById("features").scrollIntoView({
                  behavior: "smooth"
                });
                }}
                className="cursor-pointer"
              >
              Services
            </li></p>
           <p><li
              onClick={() => {
                document.getElementById("contact").scrollIntoView({
                  behavior: "smooth"
                });
              }}
              className="cursor-pointer"
            >
              Contact Us
            </li></p>
          </div>
        )}

      </nav>

      {/* ================= HERO ================= */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">

        {/* Background Image */}
        <img
          src="/images/carAccident.png"  // 👈 use your generated accident image
          alt="accident"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* LEFT DARK GRADIENT (EXACT MATCH) */}
        <div className="absolute inset-0 bg-linear-to-r from-[#081a23] via-[#081a23]/75 to-transparent"></div>

        {/* LIGHT GLOBAL OVERLAY */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* CONTENT */}
        <div className="relative max-w-7xl mx-auto px-8 w-full">

          {/* Breadcrumb */}
          <p className="text-gray-300 text-sm mb-6">
            Home &gt; Projects &gt; Accident Detection App
          </p>

          {/* Heading */}
          <h1 className="text-white text-[56px] md:text-[68px] font-semibold leading-[1.1] max-w-2xl">
            Intelligent Accident <br />
            Detection & <br />
            Management App
          </h1>
          <button className="bg-blue-500 text-white px-6 py-3 mt-5 rounded-lg hover:bg-red-600 transition duration-300">
            <Link to="/accident-analysis">Get Insights from Your Data</Link>
          </button>
          <button className="bg-blue-500 text-white px-6 py-3 mt-5 mx-4 rounded-lg hover:bg-green-600 transition duration-300">
            <Link to='/StartJourney'>Start Your Journy With SafeX</Link>
          </button>

        </div>
      </section>

    </div>
  );
};

export default Navbar;


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import logoImage from "/images/logo.jpg"

// const Navbar = () => {

//     const [open, setOpen] = useState(false)

//   return (
//     <nav className='fixed w-full top-0 left-0 z-50 rounded-lg mx-auto bg-slate-700 backdrop-blur-md py-1 flex justify-between items-center'>
//             <div className="p-2 rounded-xl bg-white/10 ml-4 backdrop-blur-md">
//             <img
//                 src={logoImage}
//                 alt="Logo"
//                 className="h-10 rounded-sm hover:scale-110 transition duration-300"
//             />
//             </div>        {/* Desktop */}
//         <ul className='hidden md:flex gap-4 mr-10 text-white items-center '>
//             <li className='px-4 py-1 rounded-lg text-white hover:bg-sky-500 transition duration-300'>
//               <a href="#about">About Us</a>
//             </li>
//             <li className='px-4 py-1 rounded-lg text-white hover:bg-sky-500 transition duration-300'>
//                 <a href="#services">Services</a>
//             </li>
//             <li className='px-4 py-1 rounded-lg text-white hover:bg-sky-500 transition duration-300'>
//                <a href="#contact">Contact</a>
//             </li>
//             <li className='px-4 py-1 rounded-lg text-white hover:bg-sky-500 transition duration-300'>
//                <Link to="/Login">Login</Link>
//             </li>
//                 <Link to="/Register">
//                     <button className='border border-white text-white px-4 py-1 rounded-full hover:bg-sky-500 transition duration-300'>
//                     Start your journey
//                 </button>
//                 </Link>
//         </ul>

//         {/* Mobile Button */}
//         <button
//             className='md:hidden text-3xl'
//             onClick={() => setOpen(!open)}
//         >
//              ☰
//         </button>

//         {/* Mobile menu */}
//         {open && (
//             <div className='absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 md:hidden'>
//                 <p ><Link to="/"> About</Link></p>
//                 <p><Link to="/Features">Service</Link></p>
//                 <p><Link to="/Footer">Contact</Link></p>
//                 <p><Link to="/Login">Login</Link></p>
//             </div>
//         )}

      
//     </nav>
//   )
// }

// export default Navbar
