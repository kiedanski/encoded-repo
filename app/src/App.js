import React from 'react';
import Navbar from './components/navbar/Navbar';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import IntensityForecast from "./pages/intensityForecast";
import GenerationMix from './pages/generationMix'


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/forecast" element={<IntensityForecast />} />
        <Route path="/generation" element={<GenerationMix />} />
      </Routes>
    </div>
  );
}
export default App;
