import { getAppImports } from "./Utils/getImports";

const {
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
} = getAppImports();

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
