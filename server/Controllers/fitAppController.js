import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dailyfitinfo from "../Models/fitInfoModel.js";
import User from "../Models/AuthModel.js";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

async function createDataPage(req, res, next) {
  try {
    const { Zone1, Zone2, Zone3, Zone4, Zone5, weight, HeartRate, Date } =
      req.body;
    const userId = req.user.id;

    const existingRecord = await dailyfitinfo.findOne({
      where: {
        userid: userId,
        DateRecorded: Date,
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
      DateRecorded: Date,
      userid: userId,
      share: false,
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
    const { Data, DataName, Date } = req.body;

    console.log("Data:", Data, "Dataname:", DataName, "Date:", Date);

    const Page = await dailyfitinfo.findOne({
      where: {
        userid: req.user.id,
        DateRecorded: Date,
      },
    });
    if (!Page) {
      return res.status(404).json({ message: "Data page not found" });
    }
    const updatedPage = await dailyfitinfo.update(
      { [DataName]: Data },
      {
        where: {
          userId: req.user.id,
          DateRecorded: Date,
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
    const userId = req.user.id;

    // Find the current share value for the user
    const record = await dailyfitinfo.findOne({
      where: {
        userid: userId,
      },
    });

    if (!record) {
      return res.status(404).json({ message: "No record found to update" });
    }

    // Toggle the share value
    const newShareValue = !record.share;

    // Update the share value in the database
    const [updatedRows] = await dailyfitinfo.update(
      { share: newShareValue },
      {
        where: {
          userid: userId,
        },
      }
    );

    if (updatedRows === 0) {
      return res.status(400).json({ message: "Failed to update share status" });
    }

    res.status(200).json({
      message: "Share status updated successfully",
      newShareValue: newShareValue,
    });
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
    res.status(200).json({ fitData });
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
      include: [
        {
          model: User,
          attributes: ["UserName"],
        },
      ],
    });

    if (!sharedData || sharedData.length === 0) {
      return res.status(404).json({ message: "No shared data found" });
    }

    const formattedData = sharedData.map((data) => {
      const jsonData = data.toJSON();
      return {
        ...jsonData,
        UserName: jsonData.User.UserName,
      };
    });

    res.status(200).json({ formattedData });
  } catch (error) {
    next(error);
  }
}
async function getShareInfo(req, res, next) {
  try {
    const userId = req.user.id;
    const sharedRecord = await dailyfitinfo.findOne({
      where: {
        userid: userId,
        share: true,
      },
    });
    if (!sharedRecord) {
      return res.status(404).json({ message: "No shared data found" });
    }

    res.status(200).json();
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
  getShareInfo,
};
