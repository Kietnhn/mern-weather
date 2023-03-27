import { createContext, useReducer } from "react";
import { weatherReducer } from "../reducers/weatherReducer";
import axios from "axios";
import {
    SET_WEATHER_DATA,
    SET_LOADING,
    SET_UNIT,
    SET_IS_USE_ANIMATE_BACKGROUND,
    apiUrl,
    SET_DATA_CHART,
    SET_IS_COMPARE,
    SET_COMPARE,
    ADD_COMPARE,
    SET_IS_SELECTED_COMPARE,
    SET_HISTORY_WEATHER,
    SET_SUN_DATA,
} from "./constants";
import moment from "moment-timezone";
export const WeatherContext = createContext();
const WeatherContextProvider = ({ children }) => {
    const [weatherState, dispatch] = useReducer(weatherReducer, {
        weatherData: {},
        historyWeather: null,
        forecastWeather: [],
        toggleTheme: false,
        isLoading: false,
        unit: "C",
        isUseAnimateBackground: false,
        dataChart: "temp",
        isCompare: false,
        isSelectedCompare: false,
        compare: [],
        sunData: null,
    });

    const getCurrentWeather = async ({ lat, lon, isCompare = false }) => {
        try {
            dispatch({
                type: SET_LOADING,
                payload: true,
            });

            const data = await axios
                .get(`${apiUrl}/weather`, {
                    params: {
                        lat,
                        lon,
                    },
                })
                .then((res) => {
                    const dataResponse = res.data.weather;
                    const getHourlyWeather = (hourlyData, timezone) => {
                        const endOfDay = moment()
                            .tz(timezone)
                            .endOf("day")
                            .valueOf();
                        const endTimeStamp = Math.floor(endOfDay / 1000);

                        const todaysData = hourlyData.filter(
                            (data) => data.dt < endTimeStamp
                        );

                        return todaysData;
                    };

                    const hourlyWeather = getHourlyWeather(
                        dataResponse.hourly,
                        dataResponse.timezone
                    );
                    const weeklyWeather = dataResponse.daily;
                    return {
                        timezone: dataResponse.timezone,
                        currentWeather: dataResponse.current,
                        hourlyWeather: hourlyWeather,
                        weeklyWeather: weeklyWeather,
                        lat: dataResponse.lat,
                        lon: dataResponse.lon,
                    };
                });
            if (!isCompare) {
                dispatch({
                    type: SET_WEATHER_DATA,
                    payload: data,
                });
            } else {
                dispatch({
                    type: ADD_COMPARE,
                    payload: data,
                });
            }
            console.log({ data });
            return data;
        } catch (error) {
            dispatch({
                type: SET_LOADING,
                payload: false,
            });
            console.error(error);
        }
    };

    const getHistoryWeather = async ({
        lat,
        lon,
        start,
        end,
        type = "temperature_2m,relativehumidity_2m,surface_pressure,windspeed_10m",
    }) => {
        try {
            dispatch({
                type: SET_LOADING,
                payload: true,
            });
            const history = await axios
                .get(`${apiUrl}/weather/history`, {
                    params: {
                        lat,
                        lon,
                        start,
                        end,
                        type,
                    },
                })
                .then((res) => res.data);
            const customHistory = {
                hourly: {
                    time: history.data.hourly.time,
                    temp: history.data.hourly.temperature_2m,
                    humidity: history.data.hourly.relativehumidity_2m,
                    pressure: history.data.hourly.surface_pressure,
                    windspeed: history.data.hourly.windspeed_10m,
                },
            };
            dispatch({ type: SET_HISTORY_WEATHER, payload: customHistory });
        } catch (error) {
            dispatch({
                type: SET_LOADING,
                payload: false,
            });
            console.error(error);
        }
    };

    const getSunData = async ({ lat, lon, date = "today", timezone }) => {
        try {
            const response = await axios(`${apiUrl}/sun`, {
                params: {
                    lat,
                    lon,
                    date,
                    timezone,
                },
            }).then((res) => res.data);
            dispatch({ type: SET_SUN_DATA, payload: response.data });
        } catch (error) {
            console.log(error);
        }
    };

    const setHistoryWeather = (payload) => {
        dispatch({ type: SET_HISTORY_WEATHER, payload });
    };
    const setIsCompare = (payload) => {
        dispatch({ type: SET_IS_COMPARE, payload });
    };
    const setIsSelectedCompare = (payload) => {
        dispatch({ type: SET_IS_SELECTED_COMPARE, payload });
    };
    const setCompare = (payload) => {
        dispatch({ type: SET_COMPARE, payload });
    };
    const addCompare = (payload) => {
        dispatch({ type: ADD_COMPARE, payload });
    };
    const setDataChart = (payload) => {
        dispatch({ type: SET_DATA_CHART, payload });
    };
    const setIsUseAnimateBackground = (payload) => {
        dispatch({ type: SET_IS_USE_ANIMATE_BACKGROUND, payload });
    };
    const setUnitTemp = (payload) => {
        dispatch({ type: SET_UNIT, payload });
    };
    const weatherContextData = {
        getCurrentWeather,
        weatherState,
        setUnitTemp,
        setIsUseAnimateBackground,
        setDataChart,
        setIsCompare,
        setCompare,
        addCompare,
        setIsSelectedCompare,
        getHistoryWeather,
        setHistoryWeather,
        getSunData,
    };
    return (
        <WeatherContext.Provider value={weatherContextData}>
            {children}
        </WeatherContext.Provider>
    );
};

export default WeatherContextProvider;
