import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import InspectorLayout from "./pages/InspectorLayout";

import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/dashboard";
import Scan from "./pages/scan_prod";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC PAGES ================= */}

        <Route element={<Layout />}>

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

        </Route>


        {/* ================= INSPECTOR PAGES ================= */}

        <Route element={<InspectorLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/scan_prod"
            element={<Scan />}
          />

          

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

  export default App;