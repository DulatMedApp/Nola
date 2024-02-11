import Header from "../Components/Header/Header";
import Home from "../Pages/HomePage/HomePage";
import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Profile from "../Pages/SignUp/Profile/Profile";
import Psychologist from "../Pages/Psychologist/Psychologist";
import Registration from "../Pages/Psychologist/Registration/Registration";

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
  /*----------Psychologist Page---------- */
  {
    path: "/psychologist",
    element: <Psychologist />,
  },
  {
    path: "/psychologist/registration",
    element: <Registration />,
  },
]);

export default router;
