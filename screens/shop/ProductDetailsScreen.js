import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const ProductDetailsScreen = ({ navigation, route }) => {
    let productId = route.params.productId;
    let selectedProduct = useSelector((store) =>
        store.products.availableProducts.find((item) => item.id === productId)
    );

    navigation.setOptions({
        headerTitle: selectedProduct.title,
    });

    return (
        <View>
            <Text>{selectedProduct.title}</Text>
        </View>
    );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({});
