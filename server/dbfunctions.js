import { pool, dateGet } from "./server.js";

//Sees if the username is already in use
async function checkUsername(username) {
  try {
    const [results] = await pool.query(
      `SELECT * FROM login WHERE UserName = ?`,
      [username]
    );
    if (results.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

//Get user id function
async function GetUserId(username, password) {
  try {
    const [results] = await pool.query(
      `SELECT UserId FROM login WHERE UserName = ? AND Pass_word = ?`,
      [username, password]
    );
    if (results.length > 0) {
      return results[0].UserId;
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.error("Database query failed", error);
    throw error;
  }
}
//Creates a new data page for the day for a specific user
//One can only have one page per day
async function createDataPage(
  zone1,
  zone2,
  zone3,
  zone4,
  zone5,
  weight,
  heartRate,
  userId
) {
  try {
    // Check if the user has a share value of 1
    const [checkResult] = await pool.query(
      `SELECT share FROM dailyfitinfo WHERE userid = ? AND share = 1`,
      [userId]
    );

    let insertWith = 0;
    if (checkResult.length > 0) {
      insertWith = 1;
    }

    const result = await pool.query(
      `INSERT INTO dailyfitinfo (Zone1Time, Zone2Time, Zone3Time, Zone4Time, Zone5Time, weight, DateRecorded, resting_heart, userid, share) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        zone1,
        zone2,
        zone3,
        zone4,
        zone5,
        weight,
        dateGet,
        heartRate,
        userId,
        insertWith,
      ]
    );
    return result;
  } catch (error) {
    throw error;
  }
}
async function checkToday(userId, date) {
  try {
    const [results] = await pool.query(
      `SELECT * FROM dailyfitinfo WHERE DateRecorded = ? AND userid = ?`,
      [date, userId]
    );
    if (results.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}
//Allowed columns for the get function
const allowedGetColumns = [
  "resting_heart",
  "Zone1Time",
  "Zone2Time",
  "Zone3Time",
  "Zone4Time",
  "Zone5Time",
  "weight",
  "DateRecorded",
  "userid",
];
//Allowed columns for the update function
const allowedUpdateColumns = [
  "resting_heart",
  "Zone1Time",
  "Zone2Time",
  "Zone3Time",
  "Zone4Time",
  "Zone5Time",
  "weight",
  "share",
];
//Stores the username for each user id so we dont need to get the username by id
//For a user we have already seen before
let UserNameIdMap = {};

//Gets the individual users data or collects all data that users are okay with sharing
async function getFitData(userId, Share) {
  if (Share) {
    try {
      //Formats the columns to be selected
      const columns = allowedGetColumns.join(", ");
      const [results] = await pool.query(
        `SELECT ${columns} FROM dailyfitinfo WHERE share = 1`
      );
      //Iterates over the results and gets the username for each user used to define the user
      //Without sending the user id to the front end
      const modifiedColumns = await Promise.all(
        results.map(async (result) => {
          //Checks if the username is already in the map
          if (UserNameIdMap[result.userid]) {
            return {
              ...result,
              UserName: UserNameIdMap[result.userid],
            };
          }
          //If not gets the username and adds it to the map
          const userName = await getUserNameById(result.userid);
          UserNameIdMap[result.userid] = userName;
          const { userid, ...rest } = result;
          return {
            ...rest,
            UserName: userName,
          };
        })
      );

      return modifiedColumns;
    } catch (error) {
      throw error;
    }
  } else {
    try {
      const columns = allowedGetColumns.join(", ");
      const [results] = await pool.query(
        `SELECT ${columns} FROM dailyfitinfo WHERE userid = ?`,
        [userId]
      );
      return results;
    } catch (error) {
      throw error;
    }
  }
}
//Gets the username by the user id
async function getUserNameById(userid) {
  try {
    const [results] = await pool.query(
      `SELECT UserName FROM login WHERE UserId = ?`,
      [userid]
    );
    if (results.length === 0) {
      throw new Error(`User with ID ${userid} not found`);
    }
    return results[0].UserName;
  } catch (error) {
    console.error("Database query failed", error);
    throw error;
  }
}
//Updates the data page for the user
//Takes in the userid to find the data and the data to update it with and the data name to know which column to update
async function updateToday(userId, data, dataname, date) {
  if (!allowedUpdateColumns.includes(dataname)) {
    console.error("Invalid column name:", dataname);
    throw new Error("Invalid column name");
  }

  try {
    let query;
    let queryParams;

    if (dataname === "share") {
      console.log("Should switch share");
      query = `UPDATE dailyfitinfo SET ${dataname} = CASE WHEN ${dataname} = 1 THEN 0 ELSE 1 END WHERE userid = ?`;
      queryParams = [userId];
    } else {
      query = `UPDATE dailyfitinfo SET ${dataname} = ? WHERE DateRecorded = ? AND userid = ?`;
      queryParams = [data, date, userId];
    }

    const [results] = await pool.query(query, queryParams);
    return results;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}

async function seeIfShareTF(userId) {
  try {
    const [results] = await pool.query(
      `SELECT share FROM dailyfitinfo WHERE userid = ?`,
      [userId]
    );
    if (results.length > 0) {
      return results[0].share === 1;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

export {
  checkUsername,
  GetUserId,
  createDataPage,
  updateToday,
  getFitData,
  checkToday,
  seeIfShareTF,
};
