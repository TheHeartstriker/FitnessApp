import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

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

app.post("/daily/workoutTime", async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
  }
});
