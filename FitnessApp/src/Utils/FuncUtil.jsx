export function formatDateToMySQL(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addAggregate(data) {
  const allFitData = Object.values(data.allFitData);

  if (allFitData.length === 0) {
    return { ...data, aggregate: {} };
  }

  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const filterByDateRange = (startDate, endDate) => {
    return allFitData.filter((entry) => {
      const entryDate = new Date(entry.DateRecorded);
      return entryDate >= startDate && entryDate <= endDate;
    });
  };

  const filterByMonth = (month, year) => {
    return allFitData.filter((entry) => {
      const entryDate = new Date(entry.DateRecorded);
      return entryDate.getMonth() === month && entryDate.getFullYear() === year;
    });
  };

  const calculateAverages = (entries, periodDays = entries.length) => {
    if (entries.length === 0) return null;

    const totals = entries.reduce(
      (acc, entry) => ({
        Zone1Time: acc.Zone1Time + (entry.Zone1Time || 0),
        Zone2Time: acc.Zone2Time + (entry.Zone2Time || 0),
        Zone3Time: acc.Zone3Time + (entry.Zone3Time || 0),
        Zone4Time: acc.Zone4Time + (entry.Zone4Time || 0),
        Zone5Time: acc.Zone5Time + (entry.Zone5Time || 0),
        resting_heart: acc.resting_heart + (entry.resting_heart || 0),
        totalZoneTime: acc.totalZoneTime + (entry.totalZoneTime || 0),
        weight: acc.weight + parseFloat(entry.weight || 0),
        calories: acc.calories + calories(entry),
      }),
      {
        Zone1Time: 0,
        Zone2Time: 0,
        Zone3Time: 0,
        Zone4Time: 0,
        Zone5Time: 0,
        resting_heart: 0,
        totalZoneTime: 0,
        weight: 0,
        calories: 0,
      }
    );

    return {
      avgZone1Time: (totals.Zone1Time / periodDays).toFixed(2),
      avgZone2Time: (totals.Zone2Time / periodDays).toFixed(2),
      avgZone3Time: (totals.Zone3Time / periodDays).toFixed(2),
      avgZone4Time: (totals.Zone4Time / periodDays).toFixed(2),
      avgZone5Time: (totals.Zone5Time / periodDays).toFixed(2),
      avgRestingHeart: (totals.resting_heart / entries.length).toFixed(2),
      avgTotalZoneTime: (totals.totalZoneTime / periodDays).toFixed(2),
      avgWeight: (totals.weight / entries.length).toFixed(2),
      avgCalories: (totals.calories / periodDays).toFixed(2),
    };
  };

  const calculatePercentageChange = (current, previous) => {
    if (!current || !previous) return null;

    const calcChange = (currentVal, previousVal) => {
      if (previousVal === 0) return 0;
      return (((currentVal - previousVal) / previousVal) * 100).toFixed(2);
    };

    return {
      caloriesChange: calcChange(
        parseFloat(current.avgCalories),
        parseFloat(previous.avgCalories)
      ),
      weightChange: calcChange(
        parseFloat(current.avgWeight),
        parseFloat(previous.avgWeight)
      ),
      heartRateChange: calcChange(
        parseFloat(current.avgRestingHeart),
        parseFloat(previous.avgRestingHeart)
      ),
    };
  };

  const pastWeek = filterByDateRange(oneWeekAgo, now);
  const weekBefore = filterByDateRange(twoWeeksAgo, oneWeekAgo);
  const currentMonthData = filterByMonth(currentMonth, currentYear);
  const lastMonthData = filterByMonth(lastMonth, lastMonthYear);
  const currentYearData = allFitData.filter((entry) => {
    const entryDate = new Date(entry.DateRecorded);
    return entryDate.getFullYear() === currentYear;
  });
  const lastYearData = allFitData.filter((entry) => {
    const entryDate = new Date(entry.DateRecorded);
    return entryDate.getFullYear() === currentYear - 1;
  });

  const currentWeekAvg = calculateAverages(pastWeek, 7);
  const lastWeekAvg = calculateAverages(weekBefore, 7);
  const currentMonthAvg = calculateAverages(currentMonthData, 30);
  const lastMonthAvg = calculateAverages(lastMonthData, 30);
  const currentYearAvg = calculateAverages(currentYearData, 365);
  const lastYearAvg = calculateAverages(lastYearData, 365);

  const aggregate = {
    currentWeek: {
      ...currentWeekAvg,
      ...calculatePercentageChange(currentWeekAvg, lastWeekAvg),
    },
    lastWeek: lastWeekAvg,
    currentMonth: {
      ...currentMonthAvg,
      ...calculatePercentageChange(currentMonthAvg, lastMonthAvg),
    },
    lastMonth: lastMonthAvg,
    currentYear: {
      ...currentYearAvg,
      ...calculatePercentageChange(currentYearAvg, lastYearAvg),
    },
    lastYear: lastYearAvg,
  };

  return { ...data, aggregate };
}

function calories(data) {
  let tempCal = 0;
  tempCal +=
    (data.Zone1Time || 0) * 4 +
    (data.Zone2Time || 0) * 6 +
    (data.Zone3Time || 0) * 8.5 +
    (data.Zone4Time || 0) * 12.5 +
    (data.Zone5Time || 0) * 17.5;
  return tempCal;
}
