import React, { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Nav from "./components/navBar/nav.jsx";
import AppRoutes from "./routing/indexRoute.jsx";
import { ReactLenis } from "lenis/react";

import "./Site.css";

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
      <ReactLenis
        root
        options={{
          duration: 1.5,
          smoothTouch: false,
          wheelMultiplier: 0.75,
        }}
      />
      <Nav />
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>,
);
