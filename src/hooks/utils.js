export function kelvinToCelsius(kelvin) {
  // 0K is absolute zero, so we can't have temperatures below that
  if (kelvin < 0) {
    throw new Error("Temperature cannot be below absolute zero (0 Kelvin).");
  }

  // Celsius is Kelvin - 273.15
  return kelvin - 273.15;
}

export function timestampToDateTime(timestamp) {
  // Create a new Date object from the timestamp (in milliseconds)
  const timestampInMilliseconds =
    timestamp < 1e12 ? timestamp * 1000 : timestamp;
  const date = new Date(timestampInMilliseconds);

  // Get individual date and time components
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Format the result as "dd/mm/yyyy : hh:mm"
  const formattedDateTime = `${day}/${month}/${year} : ${hours}:${minutes}`;

  return formattedDateTime;
}

export function timestampToDate(timestamp) {
  // Convert timestamp to milliseconds if it's in seconds
  const timestampInMilliseconds =
    timestamp < 1e12 ? timestamp * 1000 : timestamp;

  // Create a new Date object from the timestamp (in milliseconds)
  const date = new Date(timestampInMilliseconds);

  // Get individual date components
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  // Format the result as "dd/mm/yyyy"
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

export function timestampToTime(timestamp) {
  // Create a new Date object from the timestamp (in milliseconds)

  const timestampInMilliseconds =
    timestamp < 1e12 ? timestamp * 1000 : timestamp;
  const date = new Date(timestampInMilliseconds);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Format the result as "dd/mm/yyyy : hh:mm"
  const formattedDateTime = `${hours}:${minutes}`;

  return formattedDateTime;
}

export const initialLocation = {
  country: "",
  state: "",
  city: "",
};
