import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Route, RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import Header from "./Components/Header/Header";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <Header /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
