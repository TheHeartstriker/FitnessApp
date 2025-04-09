///Fetches the data from the server and formats it for the share page
export async function fetchPublicShare() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/getSharedData`,
      options
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData.message);
      return;
    }
    // Parse the response data and log it
    const responseData = await response.json();
    if (responseData.success) {
      console.log("Public share data fetched successfully");
      return responseData.formattedData;
    } else {
      console.error(
        "Error fetching public share data:",
        responseData.message || "No message",
        responseData.success || "No success message"
      );
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
//Gets all data related to a user
export async function fetchData() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/getFitData`,
      options
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData.message);
      return;
    }
    // Parse the response data and log it
    const responseData = await response.json();
    if (responseData.success) {
      console.log("Data page fetched successfully");
      return responseData.fitData;
    } else {
      console.error(
        "Error fetching data page:",
        responseData.message || "No message",
        responseData.success || "No success message"
      );
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
// Sends information to update the data page in the DB for the user on the current date
export async function saveData(DataName, Data, Date) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ DataName, Data, Date }),
  };
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/updateDataPage`,
      options
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData.message);
      return;
    }
    // Parse the response data and log it
    const responseData = await response.json();
    if (responseData.success) {
      console.log("Data updated successfully:");
    } else {
      console.error(
        "Failed to update data:",
        responseData.message || "No message",
        responseData.success || "No success message"
      );
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
//Simple check if the user is sharing data or not
export async function getShareInfo() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/getShareInfo`,
      options
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData.message);
      return;
    }
    // Parse the response data and log it
    const data = await response.json();

    if (data.success) {
      console.log("User is sharing data");
      return true;
    } else {
      console.log("User is not sharing data");
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}
//This just reverses the boolean value of the share variable in the DB
export async function updateShare() {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/updateShare`,
      options
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData.message);
      return;
    }
    // Parse the response data and log it
    const responseData = await response.json();
    if (responseData.success) {
      console.log("Share status updated successfully");
    } else {
      console.error(
        "Error updating share status:",
        responseData.message || "No message",
        responseData.success || "No success message"
      );
    }
  } catch (error) {
    console.error(error);
  }
}
