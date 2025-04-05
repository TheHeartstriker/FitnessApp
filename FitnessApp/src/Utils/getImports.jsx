import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "../Routing/authValid.jsx";
import ViewPage from "../Pages/DataView/ViewPage.jsx";
import StartPage from "../Pages/Landing/StartPage.jsx";
import LoginPage from "../Pages/Login/Login.jsx";
import Daily from "../Pages/Daily/Daily.jsx";
import Share from "../Pages/Share/Share.jsx";
import Nav from "../Components/NavBar/Nav.jsx";

import "../Site.css";
import "../Pages/Landing/StartPage.css";
import "../Pages/DataView/ViewPage.css";
import "../Pages/Login/Login.css";
import "../Pages/Daily/Daily.css";
import "../Pages/Share/Share.css";
import "../Components/NavBar/Nav.css";

export function getAppImports() {
  return {
    StrictMode,
    createRoot,
    BrowserRouter,
    Routes,
    Route,
    PrivateRoute,
    ViewPage,
    StartPage,
    LoginPage,
    Daily,
    Share,
    Nav,
  };
}
