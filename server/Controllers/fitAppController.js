import dailyfitinfo from "../Models/fitInfoModel.js";
import User from "../Models/AuthModel.js";
import { validateData } from "../utils/validateData.js";
import { groupById } from "../utils/calorieZone.js";

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

export { getAllSharedData };
