import { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
//Routing imports
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "./Routing/Provider";
//Component imports
import ViewPage from "./Pages/DataView/ViewPage.jsx";
import StartPage from "./Pages/Landing/StartPage.jsx";
import LoginPage from "./Pages/Login/Login.jsx";
import Daily from "./Pages/Daily/Daily.jsx";
import Share from "./Pages/Share/Share.jsx";
import Nav from "./Components/NavBar/Nav.jsx";
import PrivateRoute from "./Routing/Routes.jsx";
//CSS imports
import "./Site.css";
import "./Pages/Landing/StartPage.css";
import "./Pages/DataView/ViewPage.css";
import "./Pages/Login/Login.css";
import "./Pages/Daily/Daily.css";
import "./Pages/Share/Share.css";
import "./Components/NavBar/Nav.css";

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
