import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//Routing imports
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Routing/authValid.jsx";
//Component imports
import ViewPage from "./Pages/DataView/ViewPage.jsx";
import StartPage from "./Pages/Landing/StartPage.jsx";
import LoginPage from "./Pages/Login/Login.jsx";
import Daily from "./Pages/Daily/Daily.jsx";
import Share from "./Pages/Share/Share.jsx";
import Nav from "./Components/NavBar/Nav.jsx";

//CSS imports
import "./Site.css";
import "./Pages/Landing/StartPage.css";
import "./Pages/DataView/ViewPage.css";
import "./Pages/Login/Login.css";
import "./Pages/Daily/Daily.css";
import "./Pages/Share/Share.css";
import "./Components/NavBar/Nav.css";

//
//Pages contains the css and respective jsx for the page
//Components contains reusable components that are used across the app only nav.jsx is used across the app
//Routing contains PrivateRoute.jsx which is used to check if the user is logged in or not as securly as frontend can be
//Services contains the api calls for the fitness app and auth
//Utils contains reusable functions that are used across the app
//Assets contains the images and icons used in the app
//

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true }}>
      <Nav />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route
          path="/view"
          element={
            <PrivateRoute>
              {" "}
              <ViewPage />{" "}
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/daily"
          element={
            <PrivateRoute>
              {" "}
              <Daily />{" "}
            </PrivateRoute>
          }
        />
        <Route path="/share" element={<Share />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
