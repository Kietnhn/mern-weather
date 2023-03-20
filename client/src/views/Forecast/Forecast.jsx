import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { set2xIconUrl } from "../../utils/setIconUrl";
function Forecast({ listWeather = [], timezone }) {
    const changeDateFormat = (dt) => {
        return moment.unix(dt).tz(timezone).format("D");
    };
    const [forecast] = useState(() => {
        const dates = listWeather.map((weather) =>
            changeDateFormat(weather.dt)
        );

        const result = [...new Set(dates)].map((date) =>
            listWeather.filter(
                (weather) => date === changeDateFormat(weather.dt)
            )
        );
        return result;
    });

    const Item = ({ list }) => {
        return (
            <>
                {list.map((weather, index) => {
                    return (
                        <div
                            key={weather?.dt + index}
                            className="w-[116px] mx-2"
                        >
                            <div className="bg-secondDark  opacity-95  px-2 text-center rounded-lg flex flex-col items-center justify-center">
                                <p className="w-[100px]">
                                    {moment
                                        .unix(weather.dt)
                                        .tz(timezone)
                                        .format("LT")}
                                </p>
                                <div className="w-full">
                                    <img
                                        alt="weather-s-icon"
                                        src={set2xIconUrl(
                                            weather.weather[0]?.icon
                                        )}
                                        className="w-[100px] h-[100px] onject-cover"
                                    />
                                    <p className="font-semibold text-primaryText text-base">
                                        {weather.weather[0]?.main}
                                    </p>
                                </div>
                                <p className="font-bold text-2xl text-primaryText ">
                                    {weather?.temp
                                        ? weather?.temp?.toFixed(0)
                                        : weather?.main?.temp?.toFixed(0)}
                                    &deg;C
                                </p>
                            </div>
                        </div>
                    );
                })}
            </>
        );
    };
    return (
        <>
            {forecast.length > 0 &&
                forecast.map((list, index) => (
                    <div
                        className={`relative flex pt-7 pb-4 -mx-2 ${
                            index !== 0 ? "ml-2" : ""
                        }`}
                        key={`forecast ${index}`}
                    >
                        <div className="absolute top-0 left-0 right-0">
                            <p className="text-center text-sm leading-4 mx-2 bg-secondDark bg-opacity-65 rounded-xl text-primaryText">
                                {index === 0
                                    ? "Today"
                                    : moment
                                          .unix(list[0].dt)
                                          .tz(timezone)
                                          .format("dddd, MMMM Do YYYY")}
                            </p>
                        </div>
                        <Item list={list} />
                    </div>
                ))}
        </>
    );
}
export default Forecast;
