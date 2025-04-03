import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dailyfitinfo from "../Models/fitInfoModel.js";
import User from "../Models/AuthModel.js";
import { v4 as uuidv4 } from "uuid";
//Creates an empty data page for the user
async function createDataPage(req, res, next) {
  try {
    const { Date } = req.body;
    const userId = req.user.id;
    //Data validation
    if (Date === undefined || Date !== String(Date) || Date.length !== 10) {
      return res
        .status(400)
        .json({ message: "Invalid format or type", success: false });
    }
    //Data page check for today
    const existingRecord = await dailyfitinfo.findOne({
      where: {
        userid: userId,
        DateRecorded: Date,
      },
    });
    //If the user shares data
    const share = await dailyfitinfo.findOne({
      where: {
        userid: userId,
        share: true,
      },
    });
    if (existingRecord) {
      return res.status(400).json({
        message: "Data page already exists for today",
        success: false,
      });
    }
    // Create a new data page for the user
    const newRecord = await dailyfitinfo.create({
      Zone1Time: 0,
      Zone2Time: 0,
      Zone3Time: 0,
      Zone4Time: 0,
      Zone5Time: 0,
      weight: 0.0,
      resting_heart: 0,
      DateRecorded: Date,
      userid: userId,
      share: share ? share.share : false,
    });

    if (!newRecord) {
      return res.status(500).json({
        message: "Failed to create data page ",
        success: false,
      });
    }

    res
      .status(201)
      .json({ message: "Data page created successfully", success: true });
  } catch (error) {
    next(error);
  }
}
//Updates a certain data page for the user
async function updateDataPage(req, res, next) {
  try {
    const { Data, DataName, Date } = req.body;
    console.log(req.body);
    //Input validation
    if (
      DataName !== String(DataName) ||
      DataName.length > 25 ||
      Date !== String(Date) ||
      Date.length !== 10
    ) {
      return res
        .status(400)
        .json({ message: "Invalid format or type", success: false });
    }
    //Find the page
    const Page = await dailyfitinfo.findOne({
      where: {
        userid: req.user.id,
        DateRecorded: Date,
      },
    });
    if (!Page) {
      return res
        .status(404)
        .json({ message: "Data page not found", success: false });
    }
    //Update the page
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
      return res.status(400).json({
        message: "Failed to update data page input or lack of existance",
        success: false,
      });
    }
    res
      .status(200)
      .json({ message: "Data page updated successfully", success: true });
  } catch (error) {
    next(error);
  }
}
//Updates the share value for the user
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
      return res
        .status(404)
        .json({ message: "No record found to update", success: false });
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
      return res.status(400).json({
        message: "Failed to update share status ",
        success: false,
      });
    }

    res.status(200).json({
      message: "Share status updated successfully",
      success: true,
      newShareValue: newShareValue,
    });
  } catch (error) {
    next(error);
  }
}
// Gets the fit data for the user
async function getFitData(req, res, next) {
  try {
    const userId = req.user.id;
    const fitData = await dailyfitinfo.findAll({
      where: {
        userid: userId,
      },
      attributes: { exclude: ["userid"] },
    });
    if (!fitData || fitData.length === 0) {
      return res
        .status(404)
        .json({ message: "No fit data found ", success: false });
    }
    res.status(200).json({ fitData, success: true });
  } catch (error) {
    next(error);
  }
}
//Gets the share data for all users
// Could be optimized to use a single query with a join
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
      return res
        .status(404)
        .json({ message: "No shared data found", success: false });
    }
    // Format the data to include UserName
    // and remove the UserId from the response
    const formattedData = sharedData.map((data) => {
      const jsonData = data.toJSON();
      return {
        ...jsonData,
        UserName: jsonData.User.UserName,
      };
    });

    res.status(200).json({ formattedData, success: true });
  } catch (error) {
    next(error);
  }
}
//Gets the share info for the user
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
      return res
        .status(404)
        .json({ message: "No shared data found", success: false });
    }

    res.status(200).json({ success: true });
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
  getShareInfo,
};
