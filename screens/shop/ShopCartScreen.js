import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { accentColor, white } from "../../constants/colors";
import { useSelector } from "react-redux";
import CartItem from "../../components/CartItem";

const ShopCartScreen = () => {
    let totalAmount = useSelector((store) => store.cart.totalAmount);
    let cartItemsList = useSelector((store) => {
        let list = [];
        for (let key in store.cart.items) {
            list.push({
                productId: key,
                productTitle: store.cart.items[key].title,
                productPrice: store.cart.items[key].price,
                productQuantity: store.cart.items[key].quantity,
                productSum: store.cart.items[key].sum,
                productImage: store.cart.items[key].image,
            });
        }
        return list.sort((a, b) => {
            return a.productId > b.productId ? 1 : -1;
        });
    });

    return (
        <View style={styles.container}>
            <View style={styles.cartSummaryContainer}>
                <Text style={styles.totalAmount}>
                    Total Amount:{" "}
                    <Text
                        style={{ color: accentColor }}
                    >{`$${totalAmount.toFixed(2)}`}</Text>
                </Text>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        title="ORDER NOW"
                        bgColor={accentColor}
                        fgColor={white}
                        onPress={() => {}}
                        disabled={totalAmount ? false : true}
                    ></CustomButton>
                </View>
            </View>
            <FlatList
                contentContainerStyle={styles.cartItemsContaier}
                style={{ width: "100%" }}
                data={cartItemsList}
                renderItem={(itemData) => {
                    return (
                        <CartItem cartItemDetails={itemData.item}></CartItem>
                    );
                }}
                keyExtractor={(item) => item.productId}
            ></FlatList>
        </View>
    );
};

export default ShopCartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    cartSummaryContainer: {
        width: "90%",
        padding: 10,
        marginVertical: 15,
        shadowColor: "black",
        shadowRadius: 8,
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 5,
        backgroundColor: white,
        borderRadius: 10,
    },
    totalAmount: {
        fontFamily: "open-sans-bold",
        marginVertical: 5,
        fontSize: 18,
    },
    cartItemsContaier: {
        width: "100%",
        alignItems: "center",
    },
});
