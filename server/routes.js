import { Router } from "express";

import { login, register } from "./Controllers/AuthController.js";
import { authenticate } from "./middleWare/authMiddleWare.js";

import {
  createDataPage,
  updateDataPage,
  updateShare,
  getFitData,
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
router.get("/getSharedData", authenticate, getAllSharedData);
router.get("/getShareInfo", authenticate, getShareInfo);

export default router;
