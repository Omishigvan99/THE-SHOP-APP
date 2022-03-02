import {
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { Platform } from "react-native";

const CustomButton = ({ title, bgColor, fgColor, style }) => {
    return Platform.OS === "android" && Platform.Version <= 21 ? (
        <TouchableOpacity
            style={{ ...styles.button, backgroundColor: bgColor, ...style }}
            activeOpacity={0.7}
        >
            <Text style={{ color: fgColor }}>{title}</Text>
        </TouchableOpacity>
    ) : (
        <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(
                "rgba(0,0,0,0.5)",
                false
            )}
        >
            <View
                style={{ ...styles.button, backgroundColor: bgColor, ...style }}
            >
                <Text style={{ color: fgColor, ...styles.buttonText }}>
                    {title}
                </Text>
            </View>
        </TouchableNativeFeedback>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontFamily: "open-sans-regular",
    },
});
