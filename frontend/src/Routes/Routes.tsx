import App from "../App";
import Home from "../Pages/HomePage/HomePage";
import { BrowserRouter, createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

export default router;
