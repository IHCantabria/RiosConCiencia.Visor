export const isValidValue = (value) => {
  return (
    value !== null &&
    value !== undefined &&
    value !== "" &&
    (Array.isArray(value) ? value.length > 0 : true) &&
    (typeof value === "object" ? Object.keys(value).length > 0 : true)
  );
};

export const parseDate = (date) => {
  if (!date || date === "-") {
    return "-";
  }
  const dateObj = new Date(date);
  dateObj.setHours(dateObj.getHours() + 2);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1; // Los meses comienzan en 0
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
