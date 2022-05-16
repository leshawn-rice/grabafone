import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Routes
import Home from './routes/Home';
import Navbar from './navbar/Navbar';

// Styles
import '../styles/App.css';

const App = () => {
  return (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
