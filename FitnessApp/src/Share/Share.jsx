import { useEffect, useState } from "react";
function Share() {
  const [data, setData] = useState([]);
  //Full elements with related data one for each user
  const [item, setItem] = useState([]);
  //Used to reload the useeffect telling function to run and load the tabs
  const [Datafetched, setDataFetched] = useState(false);
  //The amount of tabs loaded
  const [LoadedAmount, setLoadedAmount] = useState(8);
  //Gets the shared data from the server based on usernames

  //WARNING if there is no share data an error will be thrown

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
      console.log("Data:", data.formattedData);
      const sortedData = await SortByUserName(data.formattedData);
      setData(sortedData);
      setDataFetched(true);
    } catch (error) {
      console.error(error);
    }
  }

  //Data is fetched by daily for every user so we need to merge the data into one element for each user
  async function SortByUserName(data) {
    if (data.length === 0) {
      return [];
    }
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
        // We have seen this UserName before so we merge the data and loop of its keys
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
  //Adds the items to the screen by looping over the formated data we created
  function TransposeData(data, start, end) {
    setItem([]);
    for (let i = start; i < end; i++) {
      if (!data[i]) {
        continue;
      }
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

  // Gets the average calories, average time for each zone and total time
  function GetTotalTime(GetAverage) {
    if (GetAverage.length === 0) {
      return {
        TotalTime: 0,
        Avgzone: 0,
        Cal: 0,
      };
    }
    let totalTime = 0;
    // Array to store the total time for each zone
    let zoneCounts = [0, 0, 0, 0, 0];

    GetAverage.forEach((element) => {
      if (element) {
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
      }
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
  //Helper gets the calories
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
  //Helper adds an item to the grid
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
  //Helper function checks if adding 8 itself or adding 8 is to much for the data we have
  function LoadTabs(data) {
    if (LoadedAmount + 8 > data.length) {
      return data.length;
    } else {
      return LoadedAmount + 8;
    }
  }
  //Checks if the user has scrolled to the bottom and if so make it load more tabs
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      setLoadedAmount((prevLoadedAmount) => LoadTabs(data));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data]);
  //fetches the data from the server
  useEffect(() => {
    fetchData();
  }, []);
  //Puts the data onto the screen
  useEffect(() => {
    if (Datafetched && LoadedAmount > 0 && data.length > 0) {
      TransposeData(data, 0, LoadedAmount);
    }
  }, [Datafetched, LoadedAmount]);

  return (
    <div className="ShareContainer">
      {item.map((item) => (
        <div className="Item" key={item.id}>
          <h1>{item.Name}</h1>
          <h3>Total Time tracked: {item.TotalTime}</h3>
          <h3>Days tracked: {item.Days}</h3>
          <h3>Avg Zone: {item.Avgzone}</h3>
          <h3>Heart Rate: {item.HeartRate}</h3>
          <h3>Total estimated calories burned: {item.Cal}</h3>
        </div>
      ))}
    </div>
  );
}
export default Share;
