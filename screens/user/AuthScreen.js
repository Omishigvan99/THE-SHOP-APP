import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import CustomFormInput from "../../components/CustomFormInput";
import CustomButton from "../../components/CustomButton";
import {
    accentColor,
    lightGrey,
    textGrey,
    white,
} from "../../constants/colors";
import { useDispatch } from "react-redux";
import { logInUser, signUpUser } from "../../store/actions/authActions";
import { useReducer } from "react";

const UPDATE_FORM = "UPDATE_FORM";

let formReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_FORM: {
            let updatedInputValues = {
                ...state.inputValues,
                [action.input]: action.value,
            };

            let updateInputValidaties = {
                ...state.inputValidaties,
                [action.input]: action.isValid,
            };
            let isUpdatedFormValid = true;

            for (const key in updateInputValidaties) {
                if (updateInputValidaties[key] === false)
                    isUpdatedFormValid = false;
            }

            return {
                ...state,
                inputValues: updatedInputValues,
                inputValidaties: updateInputValidaties,
                isFormValid: isUpdatedFormValid,
            };
        }
    }
};

const SignUpScreen = () => {
    let [isSignUpMode, setToSignUpMode] = useState(false);

    let dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: "",
            password: "",
        },
        inputValidaties: {
            email: false,
            password: false,
        },
        isFormValid: false,
    });

    let [isLoading, setIsloading] = useState(false);
    let [error, setError] = useState(null);

    let inputChangeHandler = useCallback((value, validity, inputIdentifier) => {
        dispatchFormState({
            type: UPDATE_FORM,
            value: value,
            isValid: validity,
            input: inputIdentifier,
        });
    });

    let authHandler = async () => {
        if (!formState.isFormValid) {
            Alert.alert("Error", "Invalid form inputs", [
                {
                    text: "OK",
                    style: "cancel",
                },
            ]);
            return;
        }
        setIsloading(true);
        try {
            if (isSignUpMode) {
                await dispatch(
                    signUpUser(
                        formState.inputValues.email,
                        formState.inputValues.password
                    )
                );
            } else {
                await dispatch(
                    logInUser(
                        formState.inputValues.email,
                        formState.inputValues.password
                    )
                );
            }
        } catch (err) {
            setError(err.message);
            setIsloading(false);
        }
    };

    useEffect(() => {
        if (error) {
            Alert.alert("Error", error, [
                {
                    text: "OK",
                    style: "cancel",
                },
            ]);
        }
    }, [error]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.form}>
                <CustomFormInput
                    label={"Email"}
                    email={true}
                    errorMessage={"Enter a valid email id"}
                    required={true}
                    initialValue={formState.inputValues.email}
                    initialyValid={formState.inputValidaties.email}
                    inputOptions={{
                        keyboardType: "email-address",
                        autoCapitalize: "none",
                    }}
                    onInputChange={(value, validity) => {
                        inputChangeHandler(value, validity, "email");
                    }}
                ></CustomFormInput>
                <CustomFormInput
                    label={"Password"}
                    inputOptions={{
                        keyboardType: "default",
                        secureTextEntry: true,
                    }}
                    onInputChange={(value, validity) => {
                        inputChangeHandler(value, validity, "password");
                    }}
                    initialValue={formState.inputValues.password}
                    initialyValid={formState.inputValidaties.password}
                    minLength={5}
                    required={true}
                    errorMessage={"Password must be more than 5 charachters"}
                ></CustomFormInput>
                {isLoading ? (
                    <View>
                        <ActivityIndicator
                            size={"large"}
                            color={accentColor}
                        ></ActivityIndicator>
                    </View>
                ) : (
                    <CustomButton
                        title={isSignUpMode ? "SIGNUP" : "LOGIN"}
                        bgColor={accentColor}
                        fgColor={white}
                        onPress={authHandler}
                    ></CustomButton>
                )}

                <View style={styles.signUpContainer}>
                    <Text style={{ color: textGrey }}>
                        {isSignUpMode
                            ? "Already have an account?"
                            : "No account?"}
                    </Text>
                    <TouchableOpacity
                        style={{ padding: 5 }}
                        activeOpacity={0.5}
                        onPress={() => {
                            setToSignUpMode((prevState) => !prevState);
                        }}
                    >
                        <Text style={styles.action}>
                            {isSignUpMode ? "Log In" : "Register"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: white,
    },
    form: {
        height: "50%",
        minHeight: 300,
        width: "85%",
        maxWidth: 400,
        borderWidth: 1,
        borderColor: lightGrey,
        borderRadius: 10,
        padding: 15,
    },
    signUpContainer: {
        flex: 1,
        marginVertical: 10,
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    action: {
        fontFamily: "open-sans-bold",
        fontSize: 16,
        color: accentColor,
        textDecorationLine: "underline",
    },
});
