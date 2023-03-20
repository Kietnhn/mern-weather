import React, { useContext } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";
import moment from "moment-timezone";

const ShowHistoryButton = () => {
    const {
        getHistoryWeather,
        setHistoryWeather,
        weatherState: {
            historyWeather,
            weatherData: {
                lat,
                lon,
                timezone,
                currentWeather: { dt },
            },
        },
    } = useContext(WeatherContext);
    const handleShowHistory = async () => {
        if (!historyWeather) {
            const secondsOf7Days = 604800;
            const date = moment
                .unix(dt - secondsOf7Days)
                .tz(timezone)
                .format("yyyy-MM-DD");
            await getHistoryWeather({ lat, lon, start: date, end: date });
        } else {
            setHistoryWeather(null);
        }
    };
    // const handleShowToast = (e) => {
    //     const toast = e.target.parentNode.querySelector(".toast");
    //     toast.classList.add("show");
    // };
    // const handleClearToast = (e) => {
    //     const toast = e.target.parentNode.querySelector(".toast");
    //     toast.classList.remove("show");
    // };
    return (
        <div className="relative ">
            <button
                className={`px-3 py-2  button center ${
                    historyWeather ? "activeButton" : ""
                } `}
                onClick={handleShowHistory}
                // onMouseEnter={handleShowToast}
                // onMouseLeave={handleClearToast}
            >
                History
            </button>
            {/* <div className="absolute hidden top-full right-0  toast z-[50] toast-before">
                <div className="theme px-2 py-1 font-semibold min-w-[120px] ">
                    {historyWeather ? "Clear " : "show "}History
                </div>
            </div> */}
        </div>
    );
};

export default ShowHistoryButton;
