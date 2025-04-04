// Handle user login
export async function handleLogin(username, password) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
    credentials: "include",
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/login`,
      options
    );
    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData.message);
      return;
    }
    // Parse the response data and log it
    const responseData = await response.json();
    if (responseData.success) {
      console.log(responseData.success, responseData.message || "No message");
      return responseData.success;
    } else {
      console.error(
        "Login failed:",
        responseData.message || "No message",
        responseData.success || "No success message"
      );
      return responseData.success;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
// Input registration data
export async function handleSignup(username, password) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
    credentials: "include",
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/register`,
      options
    );
    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData.message);
      return;
    }
    // Parse the response data and log it
    const responseData = await response.json();
    if (responseData.success) {
      console.log(responseData.success, responseData.message || "No message");
    } else {
      console.error(
        "Login failed:",
        responseData.message || "No message",
        responseData.success || "No success message"
      );
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
