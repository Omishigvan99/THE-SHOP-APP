import React, { useLayoutEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./DrawerNavigator";
import AuthNavigator from "./AuthNavigator";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setCredentials } from "../store/actions/authActions";
import { useDispatch } from "react-redux";
import { View, ActivityIndicator } from "react-native";
import { primaryColor } from "../constants/colors";

export default RootNavigator = (props) => {
    let isUserAuthenticated = useSelector(
        (store) => store.auth.isAuthenticated
    );
    let [isLoading, setLoading] = useState(false);

    let dispatch = useDispatch();

    useLayoutEffect(() => {
        try {
            let tryLogin = async () => {
                setLoading(true);
                let userData = await AsyncStorage.getItem("userData");
                userData = JSON.parse(userData);
                if (!userData) {
                    setLoading(false);
                    return;
                }

                let expireDate = new Date(userData.expire_time);
                if (
                    expireDate <= new Date() ||
                    !userData.token ||
                    !userData.userId
                ) {
                    setLoading(false);
                    return;
                }

                dispatch(setCredentials(userData.token, userData.userId, true));
                setLoading(false);
            };
            tryLogin();
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    }, []);

    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItem: "center",
                }}
            >
                <ActivityIndicator
                    size={"large"}
                    color={primaryColor}
                ></ActivityIndicator>
            </View>
        );
    }

    return (
        <NavigationContainer>
            {isUserAuthenticated ? (
                <DrawerNavigator></DrawerNavigator>
            ) : (
                <AuthNavigator></AuthNavigator>
            )}
        </NavigationContainer>
    );
};
