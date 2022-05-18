import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Components
import Navbar from './navbar/Navbar';
import NotFound from './errors/NotFound';
// Routes
import Home from './routes/Home';
import Login from './routes/Login';
// Styles
import '../styles/App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sign-in" element={<Login />}></Route>
        <Route path="/sign-up" element={<Login />}></Route>
        <Route path="/contact" element={<Login />}></Route>
        <Route path="/faq" element={<Login />}></Route>
        <Route path="/docs" element={<Login />}></Route>
        <Route path="/key" element={<Login />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
