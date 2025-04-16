import { errorChecker } from "../utils/apiError";
//
//Notes:
// - Use a try catch block on frontend to catch errors from the server or store if there is no error
// - Backend validates the data
// - Backend always returns a success and message field in the response
//

///Fetches the data from the server and formats it for the share page
export async function fetchPublicShare() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/getSharedData`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);
    return await errorChecker(response);
  } catch (error) {
    clearTimeout(timeoutId);
    return error;
  }
}
//Gets all data related to a user
export async function fetchData(timeRange, allRecords) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/getFitData?timeRange=${timeRange}&allRecords=${allRecords}`,
      { signal: controller.signal, credentials: "include" }
    );
    clearTimeout(timeoutId);
    return await errorChecker(response);
  } catch (error) {
    console.error("Error:", error);
  }
}
// Sends information to update the data page in the DB for the user on the current date
export async function saveData(DataName, Data, Date) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    signal: controller.signal,
    body: JSON.stringify({ DataName, Data, Date }),
  };
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/updateDataPage`,
      options
    );
    clearTimeout(timeoutId);
    return await errorChecker(response);
  } catch (error) {
    console.error("Error:", error);
  }
}
//Simple check if the user is sharing data or not
export async function getShareInfo() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/getShareInfo`,
      { signal: controller.signal, credentials: "include" }
    );
    clearTimeout(timeoutId);
    return await errorChecker(response);
  } catch (error) {
    console.error("Error:", error);
  }
}
//This just reverses the boolean value of the share variable in the DB
export async function updateShare() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/updateShare`,
      {
        method: "PUT",
        credentials: "include",
        signal: controller.signal,
      }
    );
    clearTimeout(timeoutId);
    return await errorChecker(response);
  } catch (error) {
    console.error("Error:", error);
  }
}
