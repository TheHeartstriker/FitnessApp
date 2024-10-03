import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//Routing imports
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "./Provider";
//Component imports
import ViewPage from "./Pages.jsx/ViewPage.jsx";
import StartPage from "./Pages.jsx/StartPage.jsx";
import LoginPage from "./Pages.jsx/Login.jsx";
import Daily from "./Pages.jsx/Daily.jsx";
//CSS imports
import "./Pages.css/StartPage.css";
import "./Pages.css/ViewPage.css";
import "./Pages.css/Login.css";
import "./Pages.css/Daily.css";

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
