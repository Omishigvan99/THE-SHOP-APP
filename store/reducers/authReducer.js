import { LOGIN_USER, SIGNUP_USER } from "../actions/authActions";

const initialState = {
    isAuthenticated: false,
    token: "",
    userId: "",
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_USER:
            return {
                isAuthenticated: action.isAuthenticated,
                token: action.token,
                userId: action.userId,
            };
        case LOGIN_USER:
            return {
                isAuthenticated: action.isAuthenticated,
                token: action.token,
                userId: action.userId,
            };
        default:
            return state;
    }
};
