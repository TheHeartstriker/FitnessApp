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

app.use(cors(corsOptions));
app.use(express.json());

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

app.get("/api", async (req, res) => {
  try {
    res.json({ message: "Hello from server!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
