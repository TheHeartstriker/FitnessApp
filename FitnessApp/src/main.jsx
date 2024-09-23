import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//Component imports
import App from "./StartPage.jsx";
//CSS imports
import "./StartPage.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
