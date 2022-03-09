export const SIGNUP_USER = "SIGNUP_USER";
export const LOGIN_USER = "LOGIN_USER";

export const signUpUser = (email, password) => {
    try {
        return async (dispatch) => {
            let response = await fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYgD18Iaakb-VlgOcYwdcsdabSL9jCZPs",
                {
                    method: "POST",
                    header: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        returnSecureToken: true,
                    }),
                }
            );

            if (!response.ok) {
                let errorResult = await response.json();
                switch (errorResult.error.message) {
                    case "EMAIL_EXISTS":
                        throw new Error(
                            "Email already exists!! Sign Up Failed"
                        );
                    default:
                        throw new Error(
                            "Something went wrong!! Sign Up Failed"
                        );
                }
            }

            let result = await response.json();
            console.log(result);
            dispatch({
                type: SIGNUP_USER,
                isAuthenticated: true,
                token: result.idToken,
                userId: result.localId,
            });
        };
    } catch (err) {
        throw err;
    }
};

export const logInUser = (email, password) => {
    try {
        return async (dispatch) => {
            let response = await fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYgD18Iaakb-VlgOcYwdcsdabSL9jCZPs",
                {
                    method: "POST",
                    header: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        returnSecureToken: true,
                    }),
                }
            );
            if (!response.ok) {
                let errorResult = await response.json();
                switch (errorResult.error.message) {
                    case "EMAIL_NOT_FOUND":
                        throw new Error(
                            "Email doesn't exist (Please register your email)"
                        );
                    case "INVALID_PASSWORD":
                        throw new Error("Password is incorrect");
                    case "USER_DISABLED":
                        throw new Error("You don't have permission to login");
                    default:
                        throw new Error(
                            "Something went wrong!! Authentication Failed"
                        );
                }
            }

            let result = await response.json();
            console.log(result);
            dispatch({
                type: LOGIN_USER,
                isAuthenticated: result.registered,
                token: result.idToken,
                userId: result.localId,
            });
        };
    } catch (err) {
        throw err;
    }
};
