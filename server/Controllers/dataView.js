import dailyfitinfo from "../Models/fitInfoModel.js";
import { dateThresh } from "../utils/dateUtil.js";
import { validateData, isValidLength } from "../utils/validateData.js";
import sequelize from "../config/configDb.js";
import { fn, Op, col, literal } from "sequelize";
// Gets the fit data for the user
async function getFitData(req, res, next) {
  try {
    const userId = req.user.id;
    const timeFrame = req.query.timeRange;
    const allRecords = req.query.allRecords;
    //Validation
    if (!["week", "month", "year"].includes(timeFrame)) {
      return res.status(400).json({
        message: "Invalid time frame. Please use 'week', 'month', or 'year'.",
        success: false,
      });
    }
    const validate = [{ timeFrame: timeFrame }];
    validateData(validate, [["timeFrame", "string"]]);
    // Querys
    // - Get the data needed, format and validate it
    const limit = limitDate(timeFrame); //Gets a limit for query
    const formattedData = await aggregated(userId, timeFrame);
    let allFitData = null;
    if (allRecords) {
      allFitData = await allRecordsQuery(userId, timeFrame, limit);
    }
    res.status(200).json({ formattedData, allFitData, success: true });
  } catch (error) {
    next(error);
  }
}
//
// Query functions
// - Gets the aggregated data and formats it
// - into data sets needed for the client
// - Validates
async function aggregated(userId, timeFrame) {
  const fitData = await dailyfitinfo.findAll({
    where: {
      userid: userId,
      DateRecorded: {
        [Op.gte]: dateThresh(new Date(), timeFrame),
      },
    },
    attributes: [
      [fn("AVG", col("weight")), "averageWeight"],
      [fn("AVG", col("resting_heart")), "averageHeartRate"],
      [fn("SUM", col("Zone1Time")), "totalZone1Time"],
      [fn("SUM", col("Zone2Time")), "totalZone2Time"],
      [fn("SUM", col("Zone3Time")), "totalZone3Time"],
      [fn("SUM", col("Zone4Time")), "totalZone4Time"],
      [fn("SUM", col("Zone5Time")), "totalZone5Time"],
    ],
  });
  if (fitData.length === 0) {
    return {
      message: "No fit data found ",
      success: false,
    };
  }
  // - Format, formats and validates the data
  let formattedData = format(fitData);
  return formattedData;
}
//Gets all the records for the user based on the time frame
//Also validates the data
async function allRecordsQuery(userId, timeFrame, limit) {
  const dateThreshold = dateThresh(new Date(), timeFrame);

  const query = `
    SELECT 
      DateRecorded,
      Zone1Time,
      Zone2Time,
      Zone3Time,
      Zone4Time,
      Zone5Time,
      (Zone1Time + Zone2Time + Zone3Time + Zone4Time + Zone5Time) AS totalZoneTime
    FROM dailyfitinfo
    WHERE userid = :userId
      AND DateRecorded >= :dateThreshold
    ORDER BY DateRecorded DESC
    LIMIT :limit
  `;

  const fitData = await sequelize.query(query, {
    replacements: { userId, dateThreshold, limit },
    type: sequelize.QueryTypes.SELECT,
  });

  const percentage = getPercentage(fitData) || "0.00";
  const validate = [{ percentage: percentage }];

  //Validate data
  if (fitData.length === 0) {
    return {
      message: "No fit data found",
      success: false,
    };
  }
  validateData(validate, [["percentage", "string"]]);
  validateData(fitData, [
    ["DateRecorded", "string"],
    ["Zone1Time", "number"],
    ["Zone2Time", "number"],
    ["Zone3Time", "number"],
    ["Zone4Time", "number"],
    ["Zone5Time", "number"],
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
      fitData[0].totalZoneTime,
      percentage,
    ],
    [10, 8, 8, 8, 8, 8, 8, 8]
  );

  return { fitData, percentage };
}
//
// Healper functions
// - Formats and validates the data to be sent to the client
// - Used in the aggregated query
// - Validates the data for aggregated query
function format(data) {
  // Collect necessary data from the fitData array oranganize it then send
  let caloriesBurned = calories(data[0].dataValues) || 0;
  let avgRestingHeart = data[0].dataValues.averageHeartRate || 0;
  let avgWeight = data[0].dataValues.averageWeight || 0;
  let totalTimeZones = {
    Zone1Time: data[0].dataValues.totalZone1Time || 0,
    Zone2Time: data[0].dataValues.totalZone2Time || 0,
    Zone3Time: data[0].dataValues.totalZone3Time || 0,
    Zone4Time: data[0].dataValues.totalZone4Time || 0,
    Zone5Time: data[0].dataValues.totalZone5Time || 0,
  };
  let formattedData = [
    {
      caloriesBurned: parseFloat(caloriesBurned).toFixed(2),
      avgRestingHeart: parseFloat(avgRestingHeart).toFixed(2),
      avgWeight: parseFloat(avgWeight).toFixed(2),
      totalTimeZones,
    },
  ];
  //Validate the data to be sent
  validateData(formattedData, [
    ["caloriesBurned", "string"],
    ["avgRestingHeart", "string"],
    ["avgWeight", "string"],
    ["totalTimeZones", "object"],
  ]);
  isValidLength(
    [
      formattedData[0].caloriesBurned,
      formattedData[0].avgRestingHeart,
      formattedData[0].avgWeight,
    ],
    [8, 8, 8, 8]
  );
  return formattedData;
}

//Gets the percentage of work compared to previous day / data
function getPercentage(fitData) {
  if (!fitData || fitData.length < 2) {
    return 0;
  }
  // Get the most recent data and the one right before it
  const mostRecent = fitData[0];
  const previous = fitData[1];

  let recentSum =
    mostRecent.Zone1Time +
    mostRecent.Zone2Time +
    mostRecent.Zone3Time +
    mostRecent.Zone4Time +
    mostRecent.Zone5Time;
  let previousSum =
    previous.Zone1Time +
    previous.Zone2Time +
    previous.Zone3Time +
    previous.Zone4Time +
    previous.Zone5Time;
  if (recentSum !== 0 && previousSum !== 0) {
    let percentage = (recentSum / previousSum) * 100;
    if (percentage >= 0) {
      return percentage.toFixed(2);
    }
  }
  return "0.00";
}
//Collects the calories burned based on the time spent in each zone
//Mutiples are based on averages
function calories(data) {
  let tempCal = 0;
  tempCal +=
    data.totalZone1Time * 4 +
    data.totalZone2Time * 6 +
    data.totalZone3Time * 8.5 +
    data.totalZone4Time * 12.5 +
    data.totalZone5Time * 17.5;
  return tempCal;
}
//Limit date
function limitDate(date) {
  if (date == "week") {
    return 7;
  } else if (date == "month") {
    return 30;
  } else if (date == "year") {
    return 365;
  }
}

export { getFitData };
