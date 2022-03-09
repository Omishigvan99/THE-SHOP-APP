import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./DrawerNavigator";
import AuthNavigator from "./AuthNavigator";
import { useSelector } from "react-redux";

export default RootNavigator = (props) => {
    let isUserAuthenticated = useSelector(
        (store) => store.auth.isAuthenticated
    );

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
