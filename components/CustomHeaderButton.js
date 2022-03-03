import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { primaryColor, white } from "../constants/colors";

const CustomHeaderButton = (props) => {
    return (
        <HeaderButton
            IconComponent={Ionicons}
            iconSize={25}
            color={Platform.OS === "android" ? white : primaryColor}
            {...props}
        ></HeaderButton>
    );
};

export default CustomHeaderButton;
