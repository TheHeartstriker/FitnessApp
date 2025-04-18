export function dateThresh(currentDate, timeFrame) {
  if (timeFrame === "week") {
    return new Date(currentDate.setDate(currentDate.getDate() - 7));
  } else if (timeFrame === "month") {
    return new Date(currentDate.setMonth(currentDate.getMonth() - 1));
  } else if (timeFrame === "year") {
    return new Date(currentDate.setFullYear(currentDate.getFullYear() - 1));
  }
  return currentDate;
}
