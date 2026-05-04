import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import {BrowserRouter, Router, Route, Routes} from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from "./pages/Register";
import StartJourney from './pages/StartJourney';
import Dashboard from './pages/Dashboard';
import AccidentDashboard from './pages/AccidentAnalysis';
import TravelingRules from './pages/TravelingRules';
 import AccidentNews from './pages/AccidentNews';

function App() {

   useEffect(() => {

    const handleTabClose = () => {
      // ❌ Remove token instantly
      localStorage.removeItem("token");

      // ⚠️ Try backend logout (may or may not execute)
      navigator.sendBeacon(
        "http://127.0.0.1:5000/logout"
      );
    };

      window.addEventListener("beforeunload", handleTabClose);

      return () => {
        window.removeEventListener("beforeunload", handleTabClose);
      };

    }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/StartJourney' element={<StartJourney />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/accident-analysis' element={<AccidentDashboard />}/>
        <Route path='/traveling-rules' element={<TravelingRules />}/>
        <Route path='/News' element={<AccidentNews />}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App
