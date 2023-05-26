const dateToHoursMinutesAMPM: (date: Date | undefined) => string = (date) => {
  if (!date) return "";
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  const minutesString = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours12}:${minutesString} ${ampm}`;
};

export default dateToHoursMinutesAMPM;
