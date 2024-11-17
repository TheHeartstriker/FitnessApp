import { useEffect, useState } from "react";
function Share() {
  const [data, setData] = useState({});
  //Full elements with related data one for each user
  const [item, setItem] = useState([]);
  //Gets the shared data from the server based on usernames
  async function fetchData() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/getSharedData`,
        options
      );
      const data = await response.json();
      setData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  function AddItem(Name, TotalTime, Avgzone, HeartRate) {
    setItem([
      ...item,
      {
        id: item.length,
        Name: Name,
        TotalTime: TotalTime,
        Avgzone: Avgzone,
        HeartRate: HeartRate,
      },
    ]);
  }

  useEffect(() => {
    //test
    AddItem("John Doe", "1:30", "3", "80");
    fetchData();
  }, []);

  return (
    <div className="ShareContainer">
      {item.map((item) => (
        <div className="Item">
          <h1>{item.Name}</h1>
          <h2>Total Time: {item.TotalTime}</h2>
          <h2>Avg Zone: {item.Avgzone}</h2>
          <h2>Heart Rate: {item.HeartRate}</h2>
        </div>
      ))}
    </div>
  );
}
export default Share;
