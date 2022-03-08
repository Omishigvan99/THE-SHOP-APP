import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useReducer, useEffect } from "react";

let UPDATE_TEXT = "UPDATE_TEXT";
let UPDATE_TOUCH = "UPDATE_TOUCH";

let inputReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_TEXT:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid,
            };

        case UPDATE_TOUCH:
            return {
                ...state,
                touched: action.value,
            };
        default:
            return state;
    }
};

const CustomFormInput = ({
    label,
    initialValue,
    initialyValid,
    inputOptions,
    errorMessage,
    email,
    min,
    max,
    minLength,
    required,
    onInputChange,
}) => {
    let [inputState, dispatch] = useReducer(inputReducer, {
        value: "",
        isValid: false,
        touched: false,
    });

    // useEffect to load inital values
    useEffect(() => {
        dispatch({
            type: UPDATE_TEXT,
            value: initialValue,
            isValid: initialyValid,
        });
    }, [initialValue, initialyValid]);

    //useEffect to handler parent inputChange option
    useEffect(() => {
        if (inputState.touched) {
            onInputChange(inputState.value, inputState.isValid);
        }
    }, [inputState]);

    let textChangeHandler = (text) => {
        const emailRegex =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (required && text.trim().length === 0) {
            isValid = false;
        }
        if (email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (min != null && +text < min) {
            isValid = false;
        }
        if (max != null && +text > max) {
            isValid = false;
        }
        if (minLength != null && text.length < minLength) {
            isValid = false;
        }
        dispatch({ type: UPDATE_TEXT, value: text, isValid: isValid });
    };

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{label}</Text>
            <TextInput
                style={styles.input}
                value={inputState.value}
                onChangeText={(text) => {
                    textChangeHandler(text);
                }}
                onFocus={() => {
                    dispatch({ type: UPDATE_TOUCH, value: true });
                }}
                onBlur={() => {
                    dispatch({ type: UPDATE_TOUCH, value: false });
                }}
                {...inputOptions}
            ></TextInput>
            {inputState.isValid || !inputState.touched ? null : (
                <Text style={styles.error}>{errorMessage}</Text>
            )}
        </View>
    );
};

export default CustomFormInput;

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 5,
    },
    inputLabel: {
        fontFamily: "open-sans-bold",
        color: "#777",
    },
    input: {
        marginVertical: 5,
        borderBottomWidth: 2,
        borderBottomColor: "#AAA",
        fontFamily: "open-sans-regular",
        fontSize: 18,
    },
    error: {
        color: "red",
        marginVertical: 5,
        fontSize: 12,
        fontFamily: "open-sans-regular",
    },
});
