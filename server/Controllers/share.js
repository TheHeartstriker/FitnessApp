import dailyfitinfo from "../Models/fitInfoModel.js";
import User from "../Models/authModel.js";
import { validateData } from "../utils/validateData.js";

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

function groupById(data) {
  // Group data by user
  const groupedData = {};
  data.forEach((record) => {
    const userId = record.userid;
    //Intialize user with empty values
    if (!groupedData[userId]) {
      groupedData[userId] = {
        totalCalories: 0,
        records: [],
        earliestDate: "9999-12-31T23:59:59.999Z",
      };
    }
    // Find the earliest available date for the user
    if (
      new Date(record.DataRecorded) < new Date(groupedData[userId].earliestDate)
    ) {
      groupedData[userId].earliestDate = record.DataRecorded;
    }
    groupedData[userId].records.push(record);
  });

  // Calculate calories for each user
  const results = [];
  for (const userId in groupedData) {
    const records = groupedData[userId].records;
    let totalCalories = 0;
    let totalTime = 0;
    let caloriesPerDay = 0;

    records.forEach((record) => {
      const zone1Calories = record.Zone1Time * 4;
      const zone2Calories = record.Zone2Time * 6;
      const zone3Calories = record.Zone3Time * 8.5;
      const zone4Calories = record.Zone4Time * 12.5;
      const zone5Calories = record.Zone5Time * 17.5;

      totalCalories +=
        zone1Calories +
        zone2Calories +
        zone3Calories +
        zone4Calories +
        zone5Calories;

      totalTime +=
        record.Zone1Time +
        record.Zone2Time +
        record.Zone3Time +
        record.Zone4Time +
        record.Zone5Time;

      const earliestDate = new Date(groupedData[userId].earliestDate);
      const currentDate = new Date();
      const daysSinceEarliest = Math.max(
        1,
        (currentDate - earliestDate) / (1000 * 60 * 60 * 24)
      );
      caloriesPerDay = totalCalories / daysSinceEarliest;
    });

    results.push({
      totalCalories: totalCalories.toFixed(2),
      totalTime,
      caloriesPerDay: caloriesPerDay.toFixed(2),
      UserName: groupedData[userId].records[0].User.UserName,
      RestingHeart: groupedData[userId].records[0].resting_heart,
    });
  }

  return results;
}

export { getAllSharedData };
