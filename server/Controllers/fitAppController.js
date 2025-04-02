import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, dailyfitinfo } from "./Models/Model.js";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

async function createDataPage(req, res, next) {
  try {
    const { Zone1, Zone2, Zone3, Zone4, Zone5, weight, HeartRate, date } =
      req.body;
    const userId = req.user.id;

    // Check if the user already has a record for today
    const existingRecord = await dailyfitinfo.findOne({
      where: {
        userId: userId,
        DateRecorded: date,
      },
    });

    if (existingRecord) {
      return res
        .status(400)
        .json({ message: "Data page already exists for today" });
    }

    // Create a new data page for the user
    const newRecord = await dailyfitinfo.create({
      Zone1Time: Zone1,
      Zone2Time: Zone2,
      Zone3Time: Zone3,
      Zone4Time: Zone4,
      Zone5Time: Zone5,
      weight: weight,
      resting_heart: HeartRate,
      DateRecorded: date,
      userid: userId,
    });

    res
      .status(201)
      .json({ message: "Data page created successfully", data: newRecord });
  } catch (error) {
    next(error);
  }
}

async function updateDataPage(req, res, next) {
  try {
    const { Data, Dataname, date } = req.body;

    const Page = await dailyfitinfo.findOne({
      where: {
        userid: req.user.id,
        DateRecorded: date,
      },
    });
    if (!Page) {
      return res.status(404).json({ message: "Data page not found" });
    }
    const updatedPage = await dailyfitinfo.update(
      { [Dataname]: Data },
      {
        where: {
          userId: req.user.id,
          DateRecorded: date,
        },
      }
    );
    if (updatedPage[0] === 0) {
      return res.status(400).json({ message: "Failed to update data page" });
    }
    res.status(200).json({ message: "Data page updated successfully" });
  } catch (error) {
    next(error);
  }
}

async function updateShare(req, res, next) {
  try {
    const { share } = req.body;

    if (typeof share !== "boolean") {
      return res
        .status(400)
        .json({ message: "Invalid share value. Must be a boolean." });
    }

    const [updatedRows] = await dailyfitinfo.update(
      { share: share },
      {
        where: {
          userid: req.user.id,
        },
      }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "No records found to update" });
    }
    res.status(200).json({ message: "Share status updated successfully" });
  } catch (error) {
    next(error);
  }
}

async function getFitData(req, res, next) {
  try {
    const userId = req.user.id;
    const fitData = await dailyfitinfo.findAll({
      where: {
        userid: userId,
      },
    });
    if (!fitData) {
      return res.status(404).json({ message: "No fit data found" });
    }
    res.status(200).json({ data: fitData });
  } catch (error) {
    next(error);
  }
}

async function getAllSharedData(req, res, next) {
  try {
    const sharedData = await dailyfitinfo.findAll({
      where: {
        share: true,
      },
    });
    if (!sharedData) {
      return res.status(404).json({ message: "No shared data found?" });
    }
    res.status(200).json({ data: sharedData });
  } catch (error) {
    next(error);
  }
}

async function seeIfShareTF(req, res, next) {
  try {
    const userId = req.user.id;
    const sharedRecord = await dailyfitinfo.findOne({
      where: {
        userid: userId,
        share: true,
      },
    });
    if (!sharedRecord) {
      return res
        .status(404)
        .json({ message: "No shared data found for the user" });
    }

    res
      .status(200)
      .json({ message: "User has shared data", data: sharedRecord });
  } catch (error) {
    next(error);
  }
}

export {
  createDataPage,
  updateDataPage,
  updateShare,
  getFitData,
  getAllSharedData,
  seeIfShareTF,
};
