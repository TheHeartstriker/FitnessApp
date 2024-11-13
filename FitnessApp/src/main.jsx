import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//Routing imports
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "./Provider";
//Component imports
import ViewPage from "./DataImpose/ViewPage.jsx";
import StartPage from "./Landing/StartPage.jsx";
import LoginPage from "./Login/Login.jsx";
import Daily from "./Daily/Daily.jsx";
//CSS imports
import "./Landing/StartPage.css";
import "./DataImpose/ViewPage.css";
import "./Login/Login.css";
import "./Daily/Daily.css";

//
//The daily page is the input page for the user to input their daily data into the server
//Data impose is the main view page for the user to see their data on graphs and the like
//Landing is the first page the user sees when they open the site before they scroll down
//

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <StartPage />
        <Routes>
          <Route path="/" element={<ViewPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/daily" element={<Daily />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
