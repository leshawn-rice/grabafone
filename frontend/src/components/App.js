import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Components
import Navbar from './navbar/Navbar';
import NotFound from './errors/NotFound';
// Routes
import Home from './routes/Home';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
// Styles
import '../styles/App.css';
import Alert from './errors/Alert';
import { clearErrors } from '../redux/actionCreators';

const App = () => {
  const dispatch = useDispatch();
  const errors = useSelector(state => state.errors);

  useEffect(() => {
    if (errors.length) dispatch(clearErrors);
  }, [errors.length, dispatch]);
  
  return (
    <BrowserRouter>
      <Navbar />
      {errors.map((error) => (
        <Alert key={error.message} error={error} />
      ))}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<SignUp />}></Route>
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
