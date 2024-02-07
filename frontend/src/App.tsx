import { Routes } from "react-router";
import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";

function App() {
  return (
    <div>
      <Header />
      <Routes />
    </div>
  );
}

export default App;
