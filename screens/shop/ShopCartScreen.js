import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect } from "react";
import CustomButton from "../../components/CustomButton";
import { accentColor, primaryColor, white } from "../../constants/colors";
import { useSelector } from "react-redux";
import CardContainer from "../../components/CardContainer";
import CartItem from "../../components/CartItem";
import { useDispatch } from "react-redux";
import { addOrder } from "../../store/actions/orderActions";
import { emptyCart } from "../../store/actions/cartActions";
import { useState } from "react";

const ShopCartScreen = ({ navigation }) => {
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
                productOwnerPushToken: store.cart.items[key].ownerPushToken,
            });
        }
        return list.sort((a, b) => {
            return a.productId > b.productId ? 1 : -1;
        });
    });

    let [isLoading, setLoading] = useState(false);
    let dispatch = useDispatch();

    useLayoutEffect(() => {
        let parentNavigator = navigation.getParent();
        parentNavigator.setOptions({
            headerTitle: "Cart",
            headerRight: () => null,
        });
    }, [navigation]);

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
                    {isLoading ? (
                        <View>
                            <ActivityIndicator
                                size={"large"}
                                color={primaryColor}
                            ></ActivityIndicator>
                        </View>
                    ) : (
                        <CustomButton
                            title="ORDER NOW"
                            bgColor={accentColor}
                            fgColor={white}
                            onPress={async () => {
                                setLoading(true);
                                await dispatch(
                                    addOrder(cartItemsList, totalAmount)
                                );
                                await dispatch(emptyCart());
                                setLoading(false);
                            }}
                            disabled={totalAmount ? false : true}
                        ></CustomButton>
                    )}
                </View>
            </View>
            <FlatList
                contentContainerStyle={styles.cartItemsContaier}
                style={{ width: "100%" }}
                data={cartItemsList}
                renderItem={(itemData) => {
                    return (
                        <CardContainer style={styles.cardContainer}>
                            <CartItem
                                cartItemDetails={itemData.item}
                            ></CartItem>
                        </CardContainer>
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
    cardContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: white,
    },
    totalAmount: {
        fontFamily: "open-sans-bold",
        marginVertical: 5,
        fontSize: 18,
    },
    cartItemsContaier: {
        flexGrow: 1,
        width: "100%",
        alignItems: "center",
    },
});
