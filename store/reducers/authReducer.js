import { SET_CREDENTIALS } from "../actions/authActions";

const initialState = {
    isAuthenticated: false,
    token: null,
    userId: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CREDENTIALS:
            return {
                isAuthenticated: action.isAuthenticated,
                token: action.token,
                userId: action.userId,
            };
        default:
            return state;
    }
};
