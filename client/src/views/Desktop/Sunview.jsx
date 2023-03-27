import React, { useContext, useEffect } from "react";
import ChartSun from "../../components/Chart/ChartSun";
import { WeatherContext } from "../../contexts/WeatherContext";

const Sunview = () => {
    const {
        weatherState: {
            weatherData: { currentWeather, timezone, lat, lon },
            sunData,
        },
        getSunData,
    } = useContext(WeatherContext);
    useEffect(() => {
        console.log({ sunData });
    }, [sunData]);
    useEffect(() => {
        const fetchApi = async () => {
            await getSunData({ lat, lon, timezone });
        };
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            Sun Chart
            <ChartSun weather={currentWeather} timezone={timezone} />
        </div>
    );
};

export default Sunview;
