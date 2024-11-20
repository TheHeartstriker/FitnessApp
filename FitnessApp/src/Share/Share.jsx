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
      console.log(data);
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
        rest.HeartDays = rest.resting_heart !== 0 ? 1 : 0;
        mergedData[UserName] = {
          UserName,
          Days: 1,
          HeartDays: rest.HeartDays,
          ...rest,
        };
      } else {
        // We have seen this UserName before so we merge the data
        // Loop over the keys
        mergedData[UserName].Days += 1;
        Object.keys(rest).forEach((key) => {
          //Get the main combined datas value
          const existingValue = mergedData[UserName][key];
          //Get the new value to add
          const newValue = rest[key];
          //Check if heart is not zero
          if (key === "resting_heart" && newValue !== 0) {
            mergedData[UserName].HeartDays += 1;
          }
          if (!isNaN(existingValue) && !isNaN(newValue)) {
            // Both existingValue and newValue are numbers or numeric strings
            mergedData[UserName][key] =
              parseFloat(existingValue) + parseFloat(newValue);
          } else {
            // Handle other types if necessary
            mergedData[UserName][key] = existingValue;
          }
        });
      }
    });
    return Object.values(mergedData);
  }

  function TransposeData(data, start, end) {
    for (let i = start; i < end; i++) {
      console.log(data[i].resting_heart, "Dataheart");
      console.log(data[i].HeartDays, "DataValue");
      let result = GetTotalTime([data[i]]);
      AddItem(
        data[i].UserName,
        data[i].resting_heart / data[i].HeartDays,
        data[i].Days,
        result.TotalTime,
        result.Avgzone,
        result.Cal
      );
    }
  }

  //Gets the average callories, average time for each zone and total time
  function GetTotalTime(GetAverage) {
    let totalTime = 0;
    // Array to store the total time for each zone
    let zoneCounts = [0, 0, 0, 0, 0];

    GetAverage.forEach((element) => {
      // Sum all zone times
      totalTime += element.Zone1Time;
      totalTime += element.Zone2Time;
      totalTime += element.Zone3Time;
      totalTime += element.Zone4Time;
      totalTime += element.Zone5Time;

      // Add to zone counts
      zoneCounts[0] += element.Zone1Time;
      zoneCounts[1] += element.Zone2Time;
      zoneCounts[2] += element.Zone3Time;
      zoneCounts[3] += element.Zone4Time;
      zoneCounts[4] += element.Zone5Time;
    });

    // Calculate average zone
    let totalZones = zoneCounts.reduce(
      (acc, time, index) => acc + time * (index + 1),
      0
    );
    let averageZone = (totalZones / totalTime).toFixed(2);

    return {
      TotalTime: totalTime,
      Avgzone: averageZone,
      Cal: GetCalories(zoneCounts),
    };
  }

  function GetCalories(data) {
    let TempCal = 0;
    TempCal +=
      data[0] * 4.5 +
      data[1] * 7.5 +
      data[2] * 11 +
      data[3] * 14.5 +
      data[4] * 16.5;
    return TempCal;
  }

  function AddItem(Name, HeartRate, Days, TotalTime, Avgzone, Cal) {
    setItem((prevItems) => [
      ...prevItems,
      {
        id: prevItems.length,
        Name: Name,
        HeartRate: HeartRate,
        Days: Days,
        TotalTime: TotalTime,
        Avgzone: Avgzone,
        Cal: Cal,
      },
    ]);
  }

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    console.log(data, "Data");
    if (data) {
      TransposeData(data, 0, data.length);
    }
  }, []);

  return (
    <div className="ShareContainer">
      {item.map((item) => (
        <div className="Item" key={item.id}>
          <h1>{item.Name}</h1>
          <h3>Total Time tracked: {item.TotalTime}</h3>
          <h3>Days track: {item.Days}</h3>
          <h3>Avg Zone: {item.Avgzone}</h3>
          <h3>Heart Rate: {item.HeartRate}</h3>
          <h3>Total estimated calories burned: {item.Cal}</h3>
        </div>
      ))}
    </div>
  );
}
export default Share;
