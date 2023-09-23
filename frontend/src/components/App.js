// External Dependencies
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Internal Dependencies
import { clearErrors } from '../redux/actionCreators';
// Components
import Navbar from './navbar/Navbar';
import NotFound from './errors/NotFound';
import Alert from './errors/Alert';
// Routes
import Home from './routes/Home';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import GenerateKey from './routes/GenerateKey';
import Docs from './routes/Docs';
import Settings from './routes/Settings';
import Contact from './routes/Contact';
import SignOut from './routes/SignOut';

// Styles
import '../styles/App.css';

const App = () => {
  const dispatch = useDispatch();
  const errors = useSelector(state => state.errors);

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);
  
  return (
    <BrowserRouter>
      <Navbar />
      <div className="Errors">
        {errors.map((error) => (
          <Alert key={error.message} error={error} />
        ))}
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<SignUp />}></Route>
        {/* Add logic to redirect if not logged in - protected routes */}
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/faq" element={<Login />}></Route>
        <Route path="/docs" element={<Docs />}></Route>
        <Route path="/generate-key" element={<GenerateKey />}></Route>
        <Route path="/sign-out" element={<SignOut />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
