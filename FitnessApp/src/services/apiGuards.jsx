export async function checkAuthentication() {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/validate`,
      options
    );
    if (response.ok) {
      const data = await response.json();
      return data.isAuthenticated;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
}
