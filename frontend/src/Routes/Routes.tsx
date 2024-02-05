import App from "../App";
import Header from "../Components/Header/Header";
import Home from "../Pages/HomePage/HomePage";
import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/header",
    element: <Header />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
