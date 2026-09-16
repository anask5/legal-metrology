import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./pages/Navbar.jsx";
import Footer from "./pages/Footer.jsx";

function Layout() {
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
}

export default Layout;