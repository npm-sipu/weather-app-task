import { useState } from "react";
import {
  fetchDataFromLatLon,
  fetchLonLatData,
  fetchWeatherData,
} from "../hooks/axios/api";
import { useMutationHandler } from "../hooks/useMutationHandler";

const Homescreen = () => {
  const [weatherData, setWeatherData] = useState();
  const [city, setCity] = useState();

  const {
    mutateAsync: mutateWeatherAsync,
    isLoading: weatherLoading,
    error: weatherError,
  } = useMutationHandler(fetchLonLatData, false);

  const {
    mutateAsync: mutateWeatherDataFromLatLon,
    isLoading: weatherLatLoading,
    error: weatherLatError,
  } = useMutationHandler(fetchDataFromLatLon, false);

  const getDataFromLatLon = async (data) => {
    await mutateWeatherDataFromLatLon(data, {
      onSuccess: (data) => {
        console.log(data);
        setWeatherData(data);
      },
    });
  };

  const handleFetchWeather = async () => {
    await mutateWeatherAsync("bhubaneswar", {
      onSuccess: (data) => {
        const inputData = {
          lat: data[0].lat,
          lon: data[0].lon,
        };

        getDataFromLatLon(inputData);
      },
      onError: (data) => {
        console.log("error data", data);
      },
    });
  };

  return (
    <div>
      <input
        type='text'
        placeholder='Type here'
        className='input input-bordered input-secondary w-full max-w-xs'
      />
      <button className='btn btn-neutral'>Neutral</button>

      <div>
        <div className='card w-96 bg-base-100 shadow-xl'>
          <div className='card-body'>
            <h2 className='card-title'>Card title!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className='card-actions justify-end'>
              <button className='btn btn-primary'>Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homescreen;
