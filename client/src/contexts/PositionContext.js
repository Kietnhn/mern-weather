import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import { positionReducer } from "../reducers/positionReducer";
import {
    apiUrl,
    SET_CURRENT_POSIITON,
    SET_LOADING,
    SET_POSITIONS,
} from "./constants";
export const PositionContext = createContext();
const PositionContextProvider = ({ children }) => {
    const [positionState, dispatch] = useReducer(positionReducer, {
        positions: null,
        currentPosition: null,
    });
    const getPosition = async (position, limit = 5) => {
        // position is name of countr,city
        dispatch({
            type: SET_LOADING,
            payload: true,
        });
        const data = await axios
            .get(`${apiUrl}/position`, {
                params: {
                    position,
                    limit,
                },
            })
            .then((res) => {
                if (res.data.data.length < 1) {
                    return [];
                }
                return res.data.data;
            });
        dispatch({
            type: SET_POSITIONS,
            payload: data,
        });
        console.log("positions", data);
        if (data.length < 1) {
            return { success: false, data, message: "No results found" };
        }
        return { success: true, data, message: "" };
    };
    const getCurrenPosition = async () => {
        const response = await axios(`${apiUrl}/position/current`);
        if (response.data.success) {
            console.log("current Position", response.data.data);
            dispatch({
                type: SET_CURRENT_POSIITON,
                payload: response.data.data,
            });
        }
        // const { latitude, longitude } = response.data.data;
        // await getNearByPosition({ lat: latitude, lon: longitude });
    };

    const getNearByPosition = async ({ lat, lon }) => {
        const data = await axios.get(`${apiUrl}/position/nearby`, {
            params: {
                lat,
                lon,
            },
        });
        console.log("newarby", data);
    };

    useEffect(() => {
        getCurrenPosition();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const PositionContextData = {
        positionState,
        getPosition,
        getCurrenPosition,
        getNearByPosition,
    };
    return (
        <PositionContext.Provider value={PositionContextData}>
            {children}
        </PositionContext.Provider>
    );
};
export default PositionContextProvider;
