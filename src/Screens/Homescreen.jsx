import { useState } from "react";
import { fetchDataFromLatLon, fetchLonLatData } from "../hooks/axios/api";
import { useMutationHandler } from "../hooks/useMutationHandler";
import { initialLocation } from "../hooks/utils";
import WeatherCard from "../Components/WeatherCard";
import Loading from "../Components/Loading";

const Homescreen = () => {
  const [location, setLocation] = useState(initialLocation);
  const [weatherData, setWeatherData] = useState();
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

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
        setWeatherData(data);
        setCity("");
      },
      onError: (data) => {
        alert(data.message);
        console.log(weatherLatError);
      },
    });
  };

  const handleFetchWeather = async () => {
    if (city === "") {
      setError("City cannot be empty");
      return;
    }
    await mutateWeatherAsync(city, {
      onSuccess: (data) => {
        setLocation({
          country: data[0]?.country,
          state: data[0]?.state,
          city: data[0]?.name,
        });
        const inputData = {
          lat: data[0]?.lat,
          lon: data[0]?.lon,
        };

        getDataFromLatLon(inputData);
      },
      onError: (data) => {
        alert(data.message);
        console.log("error data", data);
        console.log(weatherError);
      },
    });
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setCity(inputValue);

    if (inputValue.trim() === "") {
      setError("City cannot be empty");
    } else {
      setError("");
    }
  };

  if (weatherLoading || weatherLatLoading) {
    return <Loading />;
  }

  return (
    <div className='mt-4'>
      <div className='w-full flex justify-center'>
        <div className='flex flex-wrap gap-4'>
          <div className='flex flex-col gap-1'>
            <input
              type='text'
              placeholder='Type here'
              className='input input-bordered input-secondary max-md:w-full w-96'
              onChange={handleChange}
            />
            {error !== "" && <p className='text-red-400'>{error}</p>}
          </div>
          {weatherLoading || weatherLatLoading ? (
            <div className='!w-10 '>
              {" "}
              <img className='w-full' src='/LoadingCss.svg' />
            </div>
          ) : (
            <button onClick={handleFetchWeather} className='btn btn-neutral'>
              Search
            </button>
          )}
        </div>
      </div>

      <div className='flex justify-center w-full'>
        <div className='card w-[90%] max-md:w-full bg-base-100 shadow-xl'>
          <div className='card-body'>
            {weatherData?.timezone && (
              <h2 className='card-title'>Time Zone: {weatherData?.timezone}</h2>
            )}
            {location && (
              <div className=''>
                <h5 className='font-semibold text-xl'>{location.city}</h5>
                <h4 className='font-semibold text-xl'>{location.state}</h4>
                <h3 className='font-semibold text-xl'>{location.country}</h3>
              </div>
            )}
            <div className='w-full flex flex-wrap gap-2 justify-center'>
              {weatherData &&
                weatherData?.daily?.map((item, index) => (
                  <WeatherCard item={item} key={index} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homescreen;
