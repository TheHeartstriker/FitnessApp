import { Router } from "express";

import { login, register } from "./Controllers/AuthController.js";
import { authenticate } from "../middleware/authMiddleWare.js";

import {
  createDataPage,
  updateDataPage,
  updateShare,
  getFitData,
  getAllSharedData,
} from "./Controllers/fitAppController.js";

const router = Router();

router.post("/api/login", login);
router.post("/api/register", register);
router.post("/api/createDataPage", authenticate, createDataPage);
router.put("/api/updateDataPage", authenticate, updateDataPage);
router.put("/api/updateShare", authenticate, updateShare);
router.get("/api/getFitData", authenticate, getFitData);
router.get("/api/getSharedData", authenticate, getAllSharedData);
router.get("/api/getShareInfo", authenticate, getAllSharedData);
