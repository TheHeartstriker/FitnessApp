import { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
//Routing imports
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "./Provider";
//Component imports
import ViewPage from "./DataImpose/ViewPage.jsx";
import StartPage from "./Landing/StartPage.jsx";
import LoginPage from "./Login/Login.jsx";
import Daily from "./Daily/Daily.jsx";
import Share from "./Share/Share.jsx";
import Nav from "./NavBar/Nav.jsx";
import PrivateRoute from "./Routes.jsx";
//CSS imports
import "./Site.css";
import "./Landing/StartPage.css";
import "./DataImpose/ViewPage.css";
import "./Login/Login.css";
import "./Daily/Daily.css";
import "./Share/Share.css";
import "./NavBar/Nav.css";

//
//The daily page is the input page for the user to input their daily data into the server
//Data impose is the main view page for the user to see their data on graphs and the like
//Landing is the first page the user sees when they open the site before they scroll down also containing the navbar
//Share is the page where the user can share their data with others
//Login is the page where the user logs in and or registers
//Nav is self explanatory, it is the navigation bar for the site
//

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <Nav />
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route
            path="/view"
            element={<PrivateRoute element={<ViewPage />} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/daily" element={<PrivateRoute element={<Daily />} />} />
          <Route path="/share" element={<Share />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
