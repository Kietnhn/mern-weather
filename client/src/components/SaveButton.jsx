import React from "react";
import { SaveIcon, UnsaveIcon } from "./icons";
import { WeatherContext } from "../contexts/WeatherContext";
import { useContext, useState } from "react";
import { CityContext } from "../contexts/CityContext";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
const SaveButton = () => {
    const {
        weatherState: {
            weatherData: { lat, lon },
        },
    } = useContext(WeatherContext);
    const {
        authState: { isAuthenticated },
    } = useContext(AuthContext);
    const {
        cityState: { cities },
        addCity,
        deleteCity,
    } = useContext(CityContext);

    const [savedCity, setSavedCity] = useState(() => {
        return cities?.find(
            (city) => city?.lat === `${lat}` && city?.lon === `${lon}`
        );
    });
    const navigate = useNavigate();
    const handleSaveCity = () => {
        if (!isAuthenticated) return navigate("/login");
        if (savedCity) {
            unSaveCity();
        } else {
            saveCity();
        }
    };
    const unSaveCity = async () => {
        const city = cities?.find(
            (city) => city.lat === `${lat}` && city.lon === `${lon}`
        );
        await deleteCity(city._id);
        setSavedCity(false);
    };
    const saveCity = async () => {
        const response = await addCity({ lat, lon });
        if (response.success) {
            setSavedCity(true);
        }
    };

    return (
        <>
            <button className="" onClick={handleSaveCity}>
                <span>
                    {savedCity ? (
                        <SaveIcon width="22px" height="22px" />
                    ) : (
                        <UnsaveIcon width="22px" height="22px" />
                    )}
                </span>
            </button>
        </>
    );
};

export default SaveButton;
