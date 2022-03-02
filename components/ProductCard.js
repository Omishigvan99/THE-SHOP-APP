import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableNativeFeedback,
} from "react-native";
import React from "react";
import { accentColor, white, primaryColor } from "../constants/colors";
import { Platform } from "react-native-web";

const ProductCard = ({ productDetails, navigation }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
                navigation.navigate({
                    name: "Product Details",
                    params: {
                        productId: productDetails.id,
                    },
                });
            }}
        >
            <View style={styles.cardContainer}>
                <View style={styles.productInfoContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{ uri: productDetails.imageUrl }}
                        ></Image>
                    </View>
                    <View style={styles.productInfo}>
                        <Text style={styles.title}>{productDetails.title}</Text>
                        <Text style={styles.price}>
                            {"$" + productDetails.price}
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    {Platform.OS === "android" && Platform.Version >= 22 ? (
                        <TouchableOpacity
                            style={styles.button}
                            activeOpacity={0.7}
                        >
                            <Text style={{ color: white }}>ADD TO CART</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple(
                                "rgba(0,0,0,0.5)",
                                false
                            )}
                        >
                            <View style={styles.button}>
                                <Text style={{ color: white }}>
                                    ADD TO CART
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    cardContainer: {
        alignItems: "center",
        height: 450,
        marginVertical: 10,
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
    productInfoContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    imageContainer: {
        height: "80%",
        width: 320,
    },
    image: {
        height: "100%",
        width: "100%",
    },
    productInfo: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
    },
    buttonContainer: {
        width: "100%",
    },
    button: {
        padding: 15,
        alignItems: "center",
        backgroundColor: accentColor,
    },
    title: {
        fontSize: 18,
    },
    price: {
        fontSize: 20,
        color: accentColor,
        fontWeight: "bold",
    },
});
