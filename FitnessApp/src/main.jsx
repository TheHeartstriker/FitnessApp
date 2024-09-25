import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Component imports
import ViewPage from "./Pages.jsx/ViewPage.jsx";
import StartPage from "./Pages.jsx/StartPage.jsx";
//CSS imports
import "./Pages.css/StartPage.css";
import "./Pages.css/ViewPage.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <StartPage />
      <Routes>
        <Route path="/" element={<ViewPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
