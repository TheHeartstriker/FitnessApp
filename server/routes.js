import { Router } from "express";

import { login, register } from "./Controllers/authController.js";
import { authenticate } from "./middleWare/authMiddleWare.js";
import { getFitData } from "./Controllers/dataView.js";
import { getAllSharedData } from "./Controllers/share.js";
import {
  updateDataPage,
  getShareInfo,
  updateShare,
} from "./Controllers/dailyControl/daily.js";

const routes = Router();

routes.post("/login", login);
routes.post("/register", register);
routes.put("/updateDataPage", authenticate, updateDataPage);
routes.put("/updateShare", authenticate, updateShare);
routes.get("/getFitData", authenticate, getFitData);
routes.get("/getSharedData", getAllSharedData);
routes.get("/getShareInfo", authenticate, getShareInfo);
routes.get("/validate", authenticate, (req, res) => {
  res.status(200).json({ isAuthenticated: true });
});

export default routes;
