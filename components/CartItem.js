import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { accentColor, white } from "../constants/colors";
import CustomIconButton from "./CustomIconButton";
import CustomButton from "./CustomButton";
import { useDispatch } from "react-redux";
import {
    decrementQuantity,
    incrementQuantity,
    removeFromCart,
} from "../store/actions/cartActions";

const CartItem = ({ cartItemDetails }) => {
    let dispatch = useDispatch();
    return (
        <>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: cartItemDetails.productImage }}
                ></Image>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.productTitle} numberOfLines={1}>
                    {cartItemDetails.productTitle}
                </Text>
                <View style={styles.quantityContainer}>
                    <CustomIconButton
                        bgColor={accentColor}
                        IconComponent={() => (
                            <AntDesign name="plus" size={24} color={white} />
                        )}
                        onPress={() => {
                            dispatch(
                                incrementQuantity(cartItemDetails.productId)
                            );
                        }}
                    ></CustomIconButton>
                    <Text style={styles.productQuantity}>
                        {cartItemDetails.productQuantity}
                    </Text>
                    <CustomIconButton
                        bgColor={accentColor}
                        IconComponent={() => (
                            <AntDesign name="minus" size={24} color={white} />
                        )}
                        onPress={() => {
                            if (cartItemDetails.productQuantity === 1) {
                                dispatch(
                                    removeFromCart(cartItemDetails.productId)
                                );
                                return;
                            }
                            dispatch(
                                decrementQuantity(cartItemDetails.productId)
                            );
                        }}
                    ></CustomIconButton>
                </View>
                <Text style={styles.productSum}>
                    {"$" + cartItemDetails.productSum.toFixed(2)}
                </Text>
                <CustomButton
                    title={"DELETE"}
                    bgColor={"none"}
                    fgColor={accentColor}
                    onPress={() => {
                        dispatch(removeFromCart(cartItemDetails.productId));
                    }}
                    IconComponent={() => (
                        <Ionicons name="trash" size={24} color={accentColor} />
                    )}
                    containerStyle={{
                        borderWidth: 2,
                        borderColor: accentColor,
                        borderRadius: 9999,
                        overflow: "hidden",
                    }}
                ></CustomButton>
            </View>
        </>
    );
};

export default CartItem;

const styles = StyleSheet.create({
    container: {
        minWidth: "90%",
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        padding: 10,
        backgroundColor: white,
        elevation: 5,
    },
    imageContainer: {
        height: 170,
        width: 120,
        marginRight: 15,
    },
    image: {
        height: "100%",
        width: "100%",
    },
    infoContainer: {
        flex: 1,
        justifyContent: "space-between",
        height: 170,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    productTitle: {
        fontSize: 18,
        fontFamily: "open-sans-regular",
    },
    productQuantity: {
        fontSize: 18,
        fontFamily: "open-sans-regular",
    },
    productSum: {
        fontSize: 18,
        fontFamily: "open-sans-bold",
        color: accentColor,
    },
});
