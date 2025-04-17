import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import errorHandler from "./middleWare/errorMiddleWare.js";
import routes from "./routes.js";

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

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP",
});

//Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(limiter);

//Route middleware
app.use(errorHandler);

//routes
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
