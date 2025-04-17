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

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.put("/updateDataPage", authenticate, updateDataPage);
router.put("/updateShare", authenticate, updateShare);
router.get("/getFitData", authenticate, getFitData);
router.get("/getSharedData", getAllSharedData);
router.get("/getShareInfo", authenticate, getShareInfo);
router.get("/validate", authenticate, (req, res) => {
  res.status(200).json({ isAuthenticated: true });
});

export default router;
