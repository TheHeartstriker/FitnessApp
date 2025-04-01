import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function authenticate(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    console.log(decoded, "Decoded token");
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

export { authenticate };
