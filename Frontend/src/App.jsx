import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/home'
import Dashboard from "./pages/dashboard";

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

        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
