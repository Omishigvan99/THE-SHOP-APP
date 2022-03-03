import {
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
} from "react-native";
import React from "react";

const CustomIconButton = ({ bgColor, IconComponent, style, onPress }) => {
    return Platform.OS === "android" && Platform.Version <= 21 ? (
        <View style={styles.buttonWrapper}>
            <TouchableOpacity
                style={{ ...styles.button, backgroundColor: bgColor, ...style }}
                activeOpacity={0.7}
                onPress={onPress}
            >
                <IconComponent></IconComponent>
            </TouchableOpacity>
        </View>
    ) : (
        <View style={styles.buttonWrapper}>
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(
                    "rgba(0,0,0,0.5)",
                    false
                )}
                onPress={onPress}
            >
                <View
                    style={{
                        ...styles.button,
                        backgroundColor: bgColor,
                        ...style,
                    }}
                >
                    <IconComponent></IconComponent>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

export default CustomIconButton;

const styles = StyleSheet.create({
    buttonWrapper: {
        borderRadius: 9999,
        overflow: "hidden",
    },
    button: {
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },
});
