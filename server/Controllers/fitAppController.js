import dailyfitinfo from "../Models/fitInfoModel.js";
import User from "../Models/AuthModel.js";
import { validateData } from "../utils/validateData.js";
import { groupById } from "../utils/calorieZone.js";

//Creates an empty data page for the user
async function createDataPage({ Date, userId }) {
  // Data validation
  if (Date === undefined || typeof Date !== "string" || Date.length !== 10) {
    throw new Error("Invalid format or type");
  }

  // Check if a data page already exists for the given date
  const existingRecord = await dailyfitinfo.findOne({
    where: {
      userid: userId,
      DateRecorded: Date,
    },
  });

  if (existingRecord) {
    return;
  }

  // Check if the user has shared data
  const share = await dailyfitinfo.findOne({
    where: {
      userid: userId,
      share: true,
    },
  });

  // Create a new data page
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
    throw new Error("Failed to create data page");
  }

  return true;
}
//Updates a certain data page for the user
async function updateDataPage(req, res, next) {
  try {
    const { Data, DataName, Date } = req.body;

    //Create a data page
    await createDataPage({
      Date: Date,
      userId: req.user.id,
    });

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
    // Fetch all shared data
    const sharedData = await dailyfitinfo.findAll({
      where: { share: true },
      attributes: [
        "userid",
        "DateRecorded",
        "Zone1Time",
        "Zone2Time",
        "Zone3Time",
        "Zone4Time",
        "Zone5Time",
        "resting_heart",
      ],
      include: [
        {
          model: User,
          attributes: ["UserName"],
        },
      ],
      order: [
        ["userid", "ASC"],
        ["DateRecorded", "ASC"],
      ],
    });
    // Check if there is data to share
    if (sharedData.length === 0) {
      return res
        .status(404)
        .json({ message: "No shared data found", success: false });
    }
    // Format the data for the client
    const formattedData = groupById(sharedData);
    //Validate the data
    validateData(formattedData, [
      ["totalCalories", "string"],
      ["totalTime", "number"],
      ["caloriesPerDay", "string"],
      ["UserName", "string"],
      ["RestingHeart", "number"],
    ]);
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
      },
    });

    if (!sharedRecord) {
      return res
        .status(404)
        .json({ message: "No shared data found", success: false });
    }
    if (!sharedRecord.share) {
      return res
        .status(200)
        .json({ message: "Data exists but not shared", success: false });
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
