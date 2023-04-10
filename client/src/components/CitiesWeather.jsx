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
    const [data, setData] = useState([]);
    useEffect(() => {
        if (isAuthenticated && cities) {
            setData(cities);
        }
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
    const CityWeather = ({ weather }) => {
        return (
            <div
                onClick={() => hanldeSelectWeather(weather)}
                className={`w-full between overflow-hidden  rounded-2xl  
                        ${
                            weather?.weather.imgUrl
                                ? "bg-image "
                                : setBackgroundGradient(weather?.weather?.icon)
                        } theme mb-2 hover:cursor-pointer px-3 min-h-[54px]`}
                style={{
                    backgroundImage: `${
                        weather?.weather.imgUrl
                            ? `url(${weather.weather?.imgUrl})`
                            : " "
                    }`,
                }}
            >
                <h2 className="font-semibold capitalize max-w-[100px] overflow-hidden text-xl whitespace-nowrap hover:-translate-x-1/2 duration-[2s]">
                    {weather?.weather?.name}
                </h2>
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
        );
    };
    if (!data) return <></>;
    return (
        <div>
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
            {data.length > 0 && (
                <div>
                    <h3 className="font-semibold text-xl">My Positions</h3>
                    <div className="h-[50vh] overflow-auto">
                        {data.map((weather) => (
                            <div
                                key={`${
                                    weather._id || weather?.weather.imgUrl
                                }`}
                            >
                                <CityWeather weather={weather} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div>
                <h3 className="font-semibold text-xl">Famoust cities</h3>
                <div>
                    {defaultData.map((weather) => (
                        <div key={`${weather._id || weather?.weather.imgUrl}`}>
                            <CityWeather weather={weather} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CitiesWeather;
