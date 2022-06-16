import React from 'react';
import { Routes, Route } from "react-router-dom";

import Home from "./pages/HomePage";
import IntensityForecast from "./pages/IntensityForecastPage";
import GenerationMix from './pages/GenerationMixPage';
import Navbar from './components/navbar/Navbar';


const App = () =>
(
  <div>
    <Navbar />
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/forecast" element={<IntensityForecast />} />
      <Route path="/generation" element={<GenerationMix />} />
    </Routes>
  </div>
);

export default App;
