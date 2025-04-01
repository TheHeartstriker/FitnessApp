import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./Models/Model.js";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
