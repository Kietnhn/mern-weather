import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CityContext } from "../contexts/CityContext";
import { WeatherContext } from "../contexts/WeatherContext";
import { AuthContext } from "../contexts/AuthContext";
import setIconUrl from "../utils/setIconUrl";
import { DeleteIcon } from "./icons";
import setBackgroundGradient from "../utils/setBackgroundGradient";
import defaultData from "../utils/defaultCityData";
const CitiesWeather = ({ isEdit, className }) => {
    const {
        cityState: { cities },
        deleteCity,
    } = useContext(CityContext);
    const {
        getCurrentWeather,
        weatherState: { isCompare, compare },
    } = useContext(WeatherContext);
    const {
        authState: { isAuthenticated },
    } = useContext(AuthContext);
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);
    const [data, setData] = useState(null);
    useEffect(() => {
        setData(() => {
            if (isAuthenticated) {
                if (cities.length < 3) {
                    return [...cities, ...defaultData];
                }
                return cities;
            }
            return defaultData;
        });
    }, [cities, isAuthenticated]);
    const hanldeSelectWeather = async (weather) => {
        if (!isEdit) {
            const { lat, lon } = weather;
            const existedCity = compare.find(
                (city) => city.lat === lat && city.lon === lon
            );
            if (!existedCity) {
                await getCurrentWeather({ lat, lon, isCompare });
                if (!isCompare) {
                    navigate("/today");
                }
            }
        }
    };
    const handleDeleteCity = async (weather) => {
        if (isAuthenticated) {
            const { _id } = weather;
            await deleteCity(_id);
            setAlert(null);
        }
    };
    if (!data) return <></>;
    return (
        <>
            {alert && (
                <div className={`"fixed inset-0 bg-[rgba(0,0,0,.4)] z-[50]"`}>
                    <div className="bg-primaryText text-center text-dark p-6 rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <h1>Remove {alert?.name} ?</h1>
                        <div className="flex items-center justify-between gap-2">
                            <button
                                className="border px-2 py-1 rounded-lg bg-transparent text-dark border-dark"
                                onClick={() => setAlert(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="border px-2 py-1 rounded-lg bg-dark text-primaryText border-dark"
                                onClick={() => handleDeleteCity(alert)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {data?.length > 0 &&
                data?.map((weather) => (
                    <div
                        onClick={() => hanldeSelectWeather(weather)}
                        key={`${weather._id || weather?.weather.imgUrl}`}
                        className={`w-full flex items-center overflow-hidden justify-between rounded-2xl  
                        ${
                            weather?.weather.imgUrl
                                ? "bg-image"
                                : setBackgroundGradient(weather?.weather?.icon)
                        } dark:text-primaryText text-dark  mb-2 ${className}`}
                        style={{
                            backgroundImage: `${
                                weather?.weather.imgUrl
                                    ? `url(${weather.weather?.imgUrl})`
                                    : " "
                            }`,
                        }}
                    >
                        <div className="overflow-hidden w-1/2 font-semibold text-start capitalize">
                            <h2 className="text-xl whitespace-nowrap hover:-translate-x-1/2 duration-[2s]">
                                {weather?.weather?.name}
                            </h2>
                            {/* <p>{weather?.weather?.description}</p> */}
                        </div>
                        {weather?.weather?.temp && (
                            <>
                                <div>
                                    <img
                                        className="w-10 h-10"
                                        src={setIconUrl(weather?.weather?.icon)}
                                        alt={weather?.weather?.description}
                                    />
                                </div>
                                <h2 className="text-xl">
                                    {weather?.weather?.temp}&deg;
                                </h2>
                            </>
                        )}

                        {isEdit && (
                            <button onClick={() => setAlert(weather)}>
                                <span>
                                    <DeleteIcon />
                                </span>
                            </button>
                        )}
                    </div>
                ))}
        </>
    );
};

export default CitiesWeather;
