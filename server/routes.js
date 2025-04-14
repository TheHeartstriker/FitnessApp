import { Router } from "express";

import { login, register } from "./Controllers/AuthController.js";
import { authenticate } from "./middleWare/authMiddleWare.js";
import { getFitData } from "./Controllers/dataView.js";

import {
  createDataPage,
  updateDataPage,
  updateShare,
  getAllSharedData,
  getShareInfo,
} from "./Controllers/fitAppController.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/createDataPage", authenticate, createDataPage);
router.put("/updateDataPage", authenticate, updateDataPage);
router.put("/updateShare", authenticate, updateShare);
router.get("/getFitData", authenticate, getFitData);
router.get("/getSharedData", getAllSharedData);
router.get("/getShareInfo", authenticate, getShareInfo);
router.get("/validate", authenticate, (req, res) => {
  res.status(200).json({ isAuthenticated: true });
});

export default router;
