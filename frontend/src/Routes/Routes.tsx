import Header from "../Components/Header/Header";
import Home from "../Pages/HomePage/HomePage";
import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Profile from "../Pages/SignUp/Profile/Profile";

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
  {
    path: "/signup/profile",
    element: <Profile />,
  },
]);

export default router;
