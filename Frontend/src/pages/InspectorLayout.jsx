import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../pages/sidebar.jsx";

function InspectorLayout() {
  return (
    <>
      <Sidebar />

      <Outlet />
    </>
  );
}

export default InspectorLayout;