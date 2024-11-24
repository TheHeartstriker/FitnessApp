import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
//Import database functions
import {
  checkUsername,
  GetUserId,
  createDataPage,
  updateToday,
  getFitData,
  checkToday,
  seeIfShareTF,
} from "./dbfunctions.js";
//Import auth functions
import { login, signup, authenticateJWT } from "./Auth.js";

//Configures the environment variables and express
dotenv.config();
const app = express();

//cors options
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

//For the database connection
//Database pool
const pool = mysql.createPool({
  host: process.env.MY_HOST,
  user: process.env.MY_USER,
  password: process.env.MY_PASS,
  database: process.env.MY_DB,
});

//Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Stores the user id for the current user
let userIdGet = "";
//Stores the date for the current user
let dateGet = "";

//Creates a new data page for the user when they log in unless they already have one for the day
app.post("/api/createDataPage", authenticateJWT, async (req, res) => {
  const { Zone1, Zone2, Zone3, Zone4, Zone5, weight, HeartRate } = req.body;

  try {
    console.log(userIdGet);
    if ((await checkToday(userIdGet, dateGet)) == true) {
      console.log("Already have a page for today");
      res.status(200).send();
      return;
    }
    await createDataPage(
      Zone1,
      Zone2,
      Zone3,
      Zone4,
      Zone5,
      weight,
      HeartRate,
      userIdGet
    );
    res.status(201).send();
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

// Sends username and login to the database and if successful sends the user id back to the front
app.post("/api/login", async (req, res) => {
  const { username, password, date } = req.body;
  try {
    const result = await login(username, password);
    if (result) {
      const userId = await GetUserId(username, password);
      userIdGet = userId;
      dateGet = date;
      const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("jwtToken", token, {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === "true",
        sameSite: "strict",
      });
      res.status(200).send({ success: true });
    } else {
      res.status(401).send(false);
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

// Simply sends a username and password to the database to be inserted
app.post("/api/signup", async (req, res) => {
  const { username, password, UserId, date } = req.body;
  try {
    userIdGet = UserId;
    dateGet = date;
    await signup(username, password, UserId);
    const token = jwt.sign({ UserId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("jwtToken", token, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: "strict",
    });
    res.status(201).send();
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

//Checks if the username is already in use
app.post("/api/checkUsername", async (req, res) => {
  const { username } = req.body;
  try {
    const result = await checkUsername(username);
    if (result) {
      res.status(200).send(true);
    } else {
      res.status(401).send(false);
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});
//Updates the data page for the user when given the data and the data name
app.put("/api/updateDataPage", authenticateJWT, async (req, res) => {
  const requestBody = req.body;
  const DataName = Object.keys(requestBody)[0];
  const Data = requestBody[DataName];

  try {
    const result = await updateToday(userIdGet, Data, DataName, dateGet);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

app.put("/api/updateShare", authenticateJWT, async (req, res) => {
  console.log("Update share");
  try {
    const result = await updateToday(userIdGet, true, "share", dateGet);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});
//Gets the users past data
app.get("/api/getFitData", authenticateJWT, async (req, res) => {
  try {
    const result = await getFitData(userIdGet, false);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

app.get("/api/getSharedData", async (req, res) => {
  try {
    const result = await getFitData(userIdGet, true);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

app.get("/api/getShareInfo", authenticateJWT, async (req, res) => {
  try {
    const result = await seeIfShareTF(userIdGet);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
});

export { pool, userIdGet, dateGet };
