import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const app = express();

//cors options
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

//For the database connection
const pool = mysql.createPool({
  host: process.env.MY_HOST,
  user: process.env.MY_USER,
  password: process.env.MY_PASS,
  database: process.env.MY_DB,
});

app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

let userIdGet = "";

app.post("/api/createDataPage", async (req, res) => {
  const { Zone1, Zone2, Zone3, Zone4, Zone5, weight, HeartRate, Date } =
    req.body;

  try {
    if ((await checkToday(userIdGet)) == true) {
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
      Date,
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
  const { username, password } = req.body;
  try {
    const result = await login(username, password);
    if (result) {
      const userId = await GetUserId(username, password);
      userIdGet = userId;
      res.status(200).send({ success: true, Id: userId });
    } else {
      res.status(401).send(false);
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

// Simply sends a username and password to the database to be inserted
app.post("/api/signup", async (req, res) => {
  const { username, password, UserId } = req.body;
  try {
    userIdGet = UserId;
    await signup(username, password, UserId);
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

app.put("/api/updateDataPage", async (req, res) => {
  const requestBody = req.body;
  const DataName = Object.keys(requestBody)[0];
  const Data = requestBody[DataName];

  try {
    const result = await updateToday(userIdGet, Data, DataName);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

app.get("/api/getFitData", async (req, res) => {
  try {
    const result = await getFitData(userIdGet);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

//Database functions
async function signup(username, password, id) {
  console.log(username, password, id);
  try {
    // Check if the username already exists
    const [rows] = await pool.query(`SELECT * FROM login WHERE UserName = ?`, [
      username,
    ]);
    //Username has to be unique
    if (rows.length > 0) {
      return false;
    }
    // Insert the new user
    const result = await pool.query(
      `INSERT INTO login (UserName, Pass_word, UserId) VALUES (?, ?, ?)`,
      [username, password, id]
    );

    return result;
  } catch (error) {
    throw error;
  }
}

//Login function
async function login(username, password) {
  try {
    const [results] = await pool.query(
      `SELECT * FROM login WHERE UserName = ? AND Pass_word = ?`,
      [username, password]
    );
    //If the username and password match
    if (results.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Database query failed", error);
  }
}

//Sees if the username is already in use
async function checkUsername(username) {
  try {
    const [results] = await pool.query(
      `SELECT * FROM login WHERE UserName = ?`,
      [username]
    );
    if (results.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

//Get user id function
async function GetUserId(username, password) {
  try {
    const [results] = await pool.query(
      `SELECT UserId FROM login WHERE UserName = ? AND Pass_word = ?`,
      [username, password]
    );
    if (results.length > 0) {
      return results[0].UserId;
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.error("Database query failed", error);
    throw error;
  }
}
//Creates a new data page for the day for a specific user
//One can only have one page per day
async function createDataPage(
  zone1,
  zone2,
  zone3,
  zone4,
  zone5,
  weight,
  date,
  heartRate,
  userId
) {
  try {
    const result = await pool.query(
      `INSERT INTO dailyfitinfo (Zone1Time, Zone2Time, Zone3Time, Zone4Time, Zone5Time, weight, DateRecorded, resting_heart, userid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [zone1, zone2, zone3, zone4, zone5, weight, date, heartRate, userId]
    );
    return result;
  } catch (error) {
    throw error;
  }
}
//Makes sure that the user does not have a page for the day already and if so returns true
async function checkToday(userId) {
  try {
    const [results] = await pool.query(
      `SELECT * FROM dailyfitinfo WHERE DateRecorded = CURDATE() AND userid = ?`,
      [userId]
    );
    if (results.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

const allowedColumns = [
  "resting_heart",
  "Zone1Time",
  "Zone2Time",
  "Zone3Time",
  "Zone4Time",
  "Zone5Time",
  "weight",
];

async function getFitData(userId) {
  try {
    const columns = allowedColumns.join(", ");
    const [results] = await pool.query(
      `SELECT ${columns} FROM dailyfitinfo WHERE userid = ?`,
      [userId]
    );
    return results;
  } catch (error) {
    throw error;
  }
}

async function updateToday(userId, data, dataname) {
  console.log("Running the query");
  const allowedColumns = [
    "resting_heart",
    "Zone1Time",
    "Zone2Time",
    "Zone3Time",
    "Zone4Time",
    "Zone5Time",
    "weight",
  ]; // Add all allowed column names here

  if (!allowedColumns.includes(dataname)) {
    console.error("Invalid column name:", dataname);
    throw new Error("Invalid column name");
  }

  try {
    const query = `UPDATE dailyfitinfo SET ${dataname} = ? WHERE DateRecorded = CURDATE() AND userid = ?`;
    const [results] = await pool.query(query, [data, userId]);
    return results;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}
