export async function errorChecker(response) {
  //Error checking
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
  }
  const responseData = await response.json();
  if (!responseData || typeof responseData.success !== "boolean") {
    throw new Error("Invalid response format");
  }
  if (!responseData.success) {
    console.error("Error fetching data:", responseData.message);
  }
  //Return the data
  return responseData;
}
