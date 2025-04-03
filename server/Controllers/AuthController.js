import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

import User from "../Models/AuthModel.js";

dotenv.config();

//Takes a username and password
async function register(req, res, next) {
  try {
    const { username, password } = req.body;

    const existUser = await User.findOne({
      where: {
        UserName: username,
      },
    });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      UserId: uuidv4(),
      UserName: username,
      Password: hashedPassword,
    });

    const token = jwt.sign(
      { id: newUser.UserId, username: newUser.UserName },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("jwtToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "true",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    next(error);
  }
}
//Takes a username and password
async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: {
        UserName: username,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.Password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.UserId, username: user.UserName },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("jwtToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "true",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    next(error);
  }
}

export { register, login };
