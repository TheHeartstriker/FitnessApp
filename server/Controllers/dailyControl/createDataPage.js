import dailyfitinfo from "../../Models/fitInfoModel.js";
import { validateData, isValidLength } from "../../utils/validateData.js";
//Creates an empty data page for the user
async function createDataPage({ Date, userId }) {
  // Data validation
  const validate = [{ Date: Date }];
  validateData(validate, [["Date", "string"]]);
  isValidLength([Date], 10);

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

  if (newRecord.length === 0 || !newRecord) {
    return res.status(400).json({
      message: "Could not create data page",
      success: false,
    });
  }

  return true;
}

export { createDataPage };
