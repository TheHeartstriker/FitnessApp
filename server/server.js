import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
//Middleware
import errorHandler from "./middleWare/errorMiddleWare.js";
import limiter from "./middleWare/rateMiddleWare.js";
import corsMiddleware from "./middleWare/corsMiddleWare.js";
//Routes
import routes from "./routes.js";

//Configures the environment variables and express
dotenv.config();
const app = express();

//Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser());
//app.use(limiter);

//Route middleware
app.use(errorHandler);

//routes
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
