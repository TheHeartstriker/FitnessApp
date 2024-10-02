import { useState, useEffect, useContext } from "react";
import { Context } from "../Provider";

function ViewPage() {
  const { isSignedIn, setIsSignedIn } = useContext(Context);
  const [data, setData] = useState([]);

  async function fetchData() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        "http://localhost:5000/api/getFitData",
        options
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log(data);
    if (isSignedIn) {
      fetchData();
    }
  }, []);

  return (
    <div className="ViewPageContainer">
      <div className="GraphContainer">
        <h1>Graph</h1>
      </div>

      <div className="PercentageContainer">
        <h1>Percentage</h1>
      </div>
    </div>
  );
}

export default ViewPage;
