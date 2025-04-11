export async function errorChecker(response) {
  // Error checking
  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`HTTP error ${response.status}: ${response.statusText}`);
    console.error("Response body:", errorBody);
    throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
  }
  const responseData = await response.json();
  if (!responseData || typeof responseData.success !== "boolean") {
    throw new Error("Invalid response format");
  }
  if (!responseData.success) {
    console.error("Error fetching data:", responseData.message);
    throw new Error(responseData.message);
  }
  // Return the data
  return responseData;
}
