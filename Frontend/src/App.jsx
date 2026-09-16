import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/home'
import Dashboard from "./pages/dashboard";
import Scan from "./pages/scan_prod";
import History from "./pages/history";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home/>,
        },
          {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
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
