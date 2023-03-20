import React, { useContext, useEffect, useState } from "react";
import Hourly from "../../components/Desktop/Hourly";
import { WeatherContext } from "../../contexts/WeatherContext";
import { ModalCompare } from "../../components/Modals";
import SemiDoughnut from "../../components/Desktop/SemiDoughnut";
import MainView from "../../components/Desktop/MainView";
import ChartSun from "../ChartSun/ChartSun";
import Weekly from "../../components/Desktop/Weekly";
import WeatherMap from "../../components/WeatherMap";
import ShowHistoryButton from "../../components/Button/ShowHistoryButton";
const TodayDesktop = () => {
    const {
        setCompare,
        setIsCompare,
        weatherState: { isCompare, dataChart, weatherData },
        setDataChart,
    } = useContext(WeatherContext);

    const [indexActive, setIndexActive] = useState(0);

    const weather = () => {
        return indexActive === 0
            ? weatherData.currentWeather
            : weatherData.weeklyWeather[indexActive];
    };
    useEffect(() => {
        if (isCompare) {
            setIsCompare(false);
            setCompare([{ ...weatherData }]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (!isCompare) {
            setCompare([{ ...weatherData }]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [weatherData]);
    if (!weatherData) return <></>;
    return (
        <>
            {isCompare ? (
                <div>
                    <ModalCompare weather={weather()} dataChart={dataChart} />
                </div>
            ) : (
                <>
                    <div className="flex -mx-2 flex-wrap justify-between">
                        <div className="w-4/5 px-2 mb-2">
                            <MainView
                                weather={weather()}
                                indexActive={indexActive}
                                timezone={weatherData.timezone}
                            />
                            <Weekly
                                indexActive={indexActive}
                                setIndexActive={setIndexActive}
                            />
                        </div>
                        <div className="w-1/5 px-2 overflow-hidden mb-2">
                            <WeatherMap
                                lat={weatherData?.lat}
                                lon={weatherData?.lon}
                            />
                        </div>
                        <div className="w-4/5 px-2 shadow-lg">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xl font-semibold">
                                    Hourly weather infomation:{" "}
                                    <span className="capitalize">
                                        {" "}
                                        {dataChart}
                                    </span>
                                </h3>
                                <ShowHistoryButton />
                            </div>
                            <div className="w-full relative">
                                <Hourly isAlert={indexActive !== 0} />
                            </div>
                        </div>
                        <div className="w-1/5 px-2 overflow-hidden shadow-lg">
                            <div className="flex flex-wrap shadow-xl">
                                <div className="w-full p-3">
                                    <SemiDoughnut
                                        onClick={() => setDataChart("clouds")}
                                        name="clouds"
                                        percen={weather().clouds}
                                    />
                                </div>
                                <div className="w-full p-3">
                                    <ChartSun
                                        weather={weather()}
                                        timezone={weatherData.timezone}
                                        className="relative w-full  p-4 "
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default TodayDesktop;
