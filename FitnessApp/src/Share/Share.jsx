import { useEffect, useState } from "react";
function Share() {
  const [data, setData] = useState([]);
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
      const sortedData = await SortByUserName(data);
      console;
      setData(sortedData);
    } catch (error) {
      console.error(error);
    }
  }

  //Data is fetched by daily for every user so we need to merge the data into one element for each user
  async function SortByUserName(data) {
    //Store the merged results
    const mergedData = {};
    // Loop through the data
    data.forEach((element) => {
      // Destructure the UserName and the rest of the data
      const { UserName, ...rest } = element;

      // We have not seen this UserName before so we add it to the merged data
      if (!mergedData[UserName]) {
        mergedData[UserName] = { UserName, ...rest };
      } else {
        // We have seen this UserName before so we merge the data
        // Loop over the keys
        Object.keys(rest).forEach((key) => {
          const existingValue = mergedData[UserName][key];
          const newValue = rest[key];

          if (!isNaN(existingValue) && !isNaN(newValue)) {
            // Both existingValue and newValue are numbers or numeric strings
            mergedData[UserName][key] =
              parseFloat(existingValue) + parseFloat(newValue);
          } else {
            // Handle other types if necessary, or skip merging
            mergedData[UserName][key] = existingValue; // or any other logic
          }
        });
      }
    });
    return Object.values(mergedData);
  }

  function TransposeData(data, start, end) {
    console.log(data, "To transpose");
    for (let i = start; i < end; i++) {
      AddItem(data[i].UserName, data[i].resting_heart);
    }
  }

  function AddItem(Name, HeartRate) {
    setItem([
      ...item,
      {
        id: item.length,
        Name: Name,
        HeartRate: HeartRate,
      },
    ]);
  }

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (data) {
      TransposeData(data, 0, data.length);
    }
  }, [data]);

  return (
    <div className="ShareContainer">
      {item.map((item) => (
        <div className="Item" key={item.id}>
          <h1>{item.Name}</h1>
          {/* <h2>Total Time: {item.TotalTime}</h2>
          <h2>Avg Zone: {item.Avgzone}</h2> */}
          <h2>Heart Rate: {item.HeartRate}</h2>
        </div>
      ))}
    </div>
  );
}
export default Share;
