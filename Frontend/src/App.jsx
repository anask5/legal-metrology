import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Layout";
import InspectorLayout from "./pages/InspectorLayout";

import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/dashboard";
import Scan from "./pages/scan_prod";
import History from "./pages/history";

function App() {
  const router = createBrowserRouter([
    // ================= PUBLIC PAGES =================
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },

    // ================= INSPECTOR PAGES =================
    {
      element: <InspectorLayout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/scan_prod",
          element: <Scan />,
        },
        {
          path: "/history",
          element: <History />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
