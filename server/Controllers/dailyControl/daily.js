import { validateData, isValidLength } from "../../utils/validateData.js";
import dailyfitinfo from "../../Models/fitInfoModel.js";
import { createDataPage } from "./createDataPage.js";
async function updateDataPage(req, res, next) {
  try {
    const { Data, DataName, Date } = req.body;
    const validate = [{ Data: Data, DataName: DataName, Date: Date }];
    validateData(validate, [
      ["Data", "string"],
      ["DataName", "string"],
      ["Date", "string"],
    ]);
    isValidLength([DataName, Data, Date], 20, 8, 8);
    //See if we have a page for today
    const Page = await dailyfitinfo.findOne({
      where: {
        userid: req.user.id,
        DateRecorded: Date,
      },
    });
    if (!Page || Page.length === 0) {
      //Create a data page
      await createDataPage({
        Date: Date,
        userId: req.user.id,
      });
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
    if (!updatedPage || updatedPage.length === 0) {
      return res.status(400).json({
        message: "Could not update data page",
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

//Gets the share info for the user
async function getShareInfo(req, res, next) {
  try {
    const userId = req.user.id;
    const sharedRecord = await dailyfitinfo.findOne({
      where: {
        userid: userId,
      },
    });
    if (!sharedRecord || sharedRecord.length === 0) {
      return res
        .status(404)
        .json({ message: "No record found for user", success: false });
    }

    res.status(200).json({ success: true, shared: sharedRecord.share });
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

    if (!updatedRows || updatedRows.length === 0) {
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

export { updateDataPage, getShareInfo, updateShare };
