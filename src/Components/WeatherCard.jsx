/* eslint-disable react/prop-types */

import {
  kelvinToCelsius,
  timestampToDate,
  timestampToTime,
} from "../hooks/utils";

export default function WeatherCard({ item }) {
  return (
    <div className='card w-80 bg-base-100 shadow-xl'>
      <div className='card-body'>
        <h2 className='card-title'>Date: {timestampToDate(item?.dt)}</h2>

        <div className='flex flex-col gap-2'>
          <div>
            <p className='font-semibold'>Temp:</p>
          </div>
          <div className=''>
            <p className='flex'>
              <span className='w-20'>Morning: </span>
              {kelvinToCelsius(item?.temp?.morn)?.toFixed(2)} Degree Celsius.
            </p>
            <p className='flex'>
              <span className='w-20'>Day: </span>
              {kelvinToCelsius(item?.temp?.day)?.toFixed(2)} Degree Celsius.
            </p>
            <p className='flex'>
              <span className='w-20'>Evening: </span>
              {kelvinToCelsius(item?.temp?.eve)?.toFixed(2)} Degree Celsius.
            </p>
            <p className='flex'>
              <span className='w-20'>Night: </span>
              {kelvinToCelsius(item?.temp?.night)?.toFixed(2)} Degree Celsius.
            </p>
          </div>
          <div className='flex justify-between mt-2'>
            <div>
              <p>Sunrise at: {timestampToTime(item?.sunrise)}</p>
              <p>Sunset at: {timestampToTime(item?.sunset)}</p>
            </div>
            <div>
              <p>Humidity: {item?.humidity}</p>
              <p>Pressure: {item?.pressure}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
