import axios from "axios";
import { useReducer, createContext } from "react";
import { cityReducer } from "../reducers/cityReducer";
import { apiUrl } from "./constants";
import { API_KEY } from "../secret";
export const CityContext = createContext();
const CityContextProvider = ({ children }) => {
    const [cityState, dispatch] = useReducer(cityReducer, {
        cities: [],
        citiesWeather: [],
        isLoadingWeather: false,
    });
    const getCities = async () => {
        try {
            const response = await axios.get(`${apiUrl}/cities`, {
                params: {
                    API_KEY,
                },
            });
            if (response.data.success) {
                dispatch({
                    type: "SET_CITIES",
                    payload: response.data.cities,
                });
            }
        } catch (error) {
            console.error(error);
        }
    };
    const deleteCity = async (_id) => {
        try {
            const response = await axios.delete(`${apiUrl}/cities/${_id}`);
            if (response.data.success) {
                dispatch({
                    type: "DELETE_CITY",
                    payload: _id,
                });
            }
        } catch (error) {}
    };

    const addCity = async ({ lat, lon }) => {
        try {
            const response = await axios.post(`${apiUrl}/cities`, null, {
                params: {
                    lat,
                    lon,
                    API_KEY,
                },
            });
            if (response.data.success) {
                dispatch({
                    type: "ADD_CITY",
                    payload: response.data.cities,
                });
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    const cityContextData = {
        cityState,
        getCities,
        addCity,
        deleteCity,
    };
    return (
        <CityContext.Provider value={cityContextData}>
            {children}
        </CityContext.Provider>
    );
};
export default CityContextProvider;
