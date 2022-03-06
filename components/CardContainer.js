import { StyleSheet, View } from "react-native";
import React from "react";
import { white } from "../constants/colors";

const CardContainer = ({ children, style }) => {
    return <View style={{ ...styles.container, ...style }}>{children}</View>;
};

export default CardContainer;

const styles = StyleSheet.create({
    container: {
        minWidth: "90%",
        marginVertical: 5,
        shadowColor: "black",
        shadowRadius: 8,
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 5,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: white,
    },
});
