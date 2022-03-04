import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";
import { accentColor, white } from "../constants/colors";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/actions/cartActions";
const ProductCard = ({ productDetails, navigation }) => {
    let dispatch = useDispatch();

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
                navigation.navigate({
                    name: "Product Details",
                    params: {
                        productId: productDetails.id,
                        productTitle: productDetails.title,
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
                            {"$" + productDetails.price.toFixed(2)}
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        title="ADD TO CART"
                        bgColor={accentColor}
                        fgColor={white}
                        onPress={() => {
                            dispatch(addToCart(productDetails));
                        }}
                    ></CustomButton>
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
    title: {
        fontSize: 18,
        fontFamily: "open-sans-regular",
    },
    price: {
        fontSize: 20,
        color: accentColor,
        fontFamily: "open-sans-bold",
    },
});
