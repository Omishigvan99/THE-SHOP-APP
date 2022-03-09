import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../screens/user/AuthScreen";
import { primaryColor, white } from "../constants/colors";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor:
                        Platform.OS === "android" ? primaryColor : white,
                },
                headerTitleStyle: {
                    fontFamily: "open-sans-bold",
                },
                headerTintColor:
                    Platform.OS === "android" ? white : primaryColor,
            }}
        >
            <Stack.Screen
                name="SignUp"
                component={AuthScreen}
                options={{
                    headerTitle: "Authenticate",
                }}
            ></Stack.Screen>
        </Stack.Navigator>
    );
};

export default AuthNavigator;
