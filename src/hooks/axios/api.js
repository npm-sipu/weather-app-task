import axios from "axios";

let URL = "http://api.openweathermap.org/";

const instance = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

export const fetchWeatherData = async (city) => {
  const response = await axios.get(
    `${URL}data/2.5/weather/data/2.5/weather?q=${city}&appid=1635890035cbba097fd5c26c8ea672a1`
  );
  return response.data;
};

export const fetchLonLatData = async (city) => {
  const response = await axios.get(
    `${URL}geo/1.0/direct?q=${city}&limit=1&appid=1635890035cbba097fd5c26c8ea672a1`
  );
  return response.data;
};

export const fetchDataFromLatLon = async (inputData) => {
  const response = await axios.get(
    `${URL}data/2.5/onecall?lat=${inputData.lat}&lon=${inputData.lon}&exclude=current,minutely,hourly,alerts&appid=1635890035cbba097fd5c26c8ea672a1`
  );
  return response.data;
};

export default instance;
