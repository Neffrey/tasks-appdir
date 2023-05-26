const monthNumberToName: (number: number) => string = (number) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const result = months[number];
  if (result === undefined || result === null || number < 0 || number >= 12) {
    return "";
  }
  return result;
};

export default monthNumberToName;
