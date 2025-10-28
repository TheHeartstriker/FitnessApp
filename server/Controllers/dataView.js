import dailyfitinfo from "../Models/fitInfoModel.js";
import { validateData, isValidLength } from "../utils/validateData.js";
import { literal } from "sequelize";
// Gets the fit data for the user
async function getFitData(req, res, next) {
  try {
    const userId = req.user.id;
    // Querys
    // - Get the data needed, format and validate it
    const allFitData = await allRecordsQuery(userId);
    res.status(200).json({ allFitData, success: true });
  } catch (error) {
    next(error);
  }
}
//
// Query functions

//Gets all the records for the user based on the time frame
//Also validates the data
async function allRecordsQuery(userId) {
  const fitData = await dailyfitinfo.findAll({
    where: { userid: userId },
    attributes: [
      "DateRecorded",
      "Zone1Time",
      "Zone2Time",
      "Zone3Time",
      "Zone4Time",
      "Zone5Time",
      "weight",
      "resting_heart",
      [
        literal("(Zone1Time + Zone2Time + Zone3Time + Zone4Time + Zone5Time)"),
        "totalZoneTime",
      ],
    ],
    order: [["DateRecorded", "DESC"]],
    raw: true,
  });

  //Validate data
  if (fitData.length === 0) {
    return {
      message: "No fit data found",
      success: false,
    };
  }

  validateData(fitData, [
    ["DateRecorded", "string"],
    ["Zone1Time", "number"],
    ["Zone2Time", "number"],
    ["Zone3Time", "number"],
    ["Zone4Time", "number"],
    ["Zone5Time", "number"],
    ["weight", "string"],
    ["resting_heart", "number"],
    ["totalZoneTime", "number"],
  ]);

  isValidLength(
    [
      fitData[0].DateRecorded,
      fitData[0].Zone1Time,
      fitData[0].Zone2Time,
      fitData[0].Zone3Time,
      fitData[0].Zone4Time,
      fitData[0].Zone5Time,
      fitData[0].weight,
      fitData[0].resting_heart,
      fitData[0].totalZoneTime,
    ],
    [10, 8, 8, 8, 8, 8, 8, 8, 8]
  );

  return fitData;
}

export { getFitData };
