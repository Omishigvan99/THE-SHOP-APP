import {
    StyleSheet,
    View,
    Text,
    FlatList,
    ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ProductCard from "../../components/ProductCard";
import CustomButton from "../../components/CustomButton";
import { white, accentColor, primaryColor } from "../../constants/colors";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions/cartActions";
import { fetchProducts } from "../../store/actions/productsAction";
import { useFocusEffect } from "@react-navigation/native";

const ProductsOverviewScreen = ({ navigation }) => {
    let productsList = useSelector((state) => state.products.availableProducts);
    let dispatch = useDispatch();

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    let loadProducts = useCallback(async () => {
        setLoading(true);
        try {
            await dispatch(fetchProducts());
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    }, [dispatch, setLoading, setError]);

    // old way to update screen in < v4
    // useEffect(() => {
    //     let willFocusLoad = navigation.addListener("focus", loadProducts);
    //     return () => {
    //         willFocusLoad.remove();
    //     };
    // }, [loadProducts]);

    // making sure we load are screen again to fetch data in v6 react navigation
    useFocusEffect(
        useCallback(() => {
            loadProducts();
        }, [loadProducts])
    );

    useEffect(() => {
        loadProducts();
    }, [dispatch, loadProducts, error]);

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.info}>{error}</Text>
                <CustomButton
                    title={"TRY AGAIN"}
                    bgColor={accentColor}
                    fgColor={white}
                    onPress={() => {
                        setError(null);
                    }}
                ></CustomButton>
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.conatiner}>
                <ActivityIndicator
                    size={"large"}
                    color={primaryColor}
                ></ActivityIndicator>
            </View>
        );
    }

    if (!isLoading && productsList.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.info}>Nothing to show here</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.listContainer}
                style={{ width: "100%" }}
                data={productsList}
                renderItem={(itemData) => {
                    return (
                        <ProductCard
                            productDetails={itemData.item}
                            navigation={navigation}
                            routeName={"Product Details"}
                        >
                            <CustomButton
                                title="ADD TO CART"
                                bgColor={accentColor}
                                fgColor={white}
                                onPress={() => {
                                    dispatch(addToCart(itemData.item));
                                }}
                            ></CustomButton>
                        </ProductCard>
                    );
                }}
            ></FlatList>
        </View>
    );
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
    listContainer: {
        alignItems: "center",
        backgroundColor: white,
    },
    info: {
        fontSize: 16,
        fontFamily: "open-sans-regular",
    },
});
