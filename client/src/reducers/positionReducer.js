import { SET_CURRENT_POSIITON, SET_POSITIONS } from "../contexts/constants";

export const positionReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_POSITIONS:
            return {
                ...state,
                positions: payload,
                isLoading: false,
            };
        case SET_CURRENT_POSIITON:
            return {
                ...state,
                currentPosition: payload,
            };
        default:
            return state;
    }
};
