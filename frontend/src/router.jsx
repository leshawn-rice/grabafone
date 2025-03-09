import { createBrowserRouter, Route, createRoutesFromElements, Navigate } from "react-router-dom";
import NotFound from "./components/errors/not-found.jsx";
import Layout from "./layout.jsx";
import Register from "./routes/register.jsx";
import Login from "./routes/login.jsx";
import Home from "./routes/home.jsx";
import Contact from "./routes/contact.jsx";
import Settings from "./routes/settings.jsx";
import Docs from "./routes/docs.jsx";
import GenerateKey from "./routes/generate-key.jsx";
import Logout from "./routes/logout.jsx";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Add logic to redirect if not logged in - protected routes */}

      <Route path="/settings" element={<Settings />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<Login />} />
      <Route path="/docs" element={<Docs />} />
      <Route path="/generate-key" element={<GenerateKey />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default Router