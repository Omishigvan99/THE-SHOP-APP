import {
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { Platform } from "react-native";

const CustomButton = ({
    title,
    bgColor,
    fgColor,
    style,
    containerStyle,
    onPress,
    disabled,
    IconComponent = () => {
        return null;
    },
}) => {
    return (
        <View style={{ ...containerStyle }}>
            {Platform.OS === "android" && Platform.Version <= 21 ? (
                <TouchableOpacity
                    style={{
                        ...styles.button,
                        backgroundColor: !disabled ? bgColor : "#AAA",
                        ...style,
                    }}
                    activeOpacity={0.7}
                    onPress={onPress}
                    disabled={disabled}
                >
                    <IconComponent></IconComponent>
                    <Text style={{ color: fgColor }}>{title}</Text>
                </TouchableOpacity>
            ) : (
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple(
                        "rgba(0,0,0,0.5)",
                        false
                    )}
                    onPress={onPress}
                    disabled={disabled}
                >
                    <View
                        style={{
                            ...styles.button,
                            backgroundColor: !disabled ? bgColor : "#AAA",
                            ...style,
                        }}
                    >
                        <IconComponent></IconComponent>
                        <Text style={{ color: fgColor, ...styles.buttonText }}>
                            {title}
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            )}
        </View>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontFamily: "open-sans-regular",
    },
});
