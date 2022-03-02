import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

import ProductCard from "../../components/ProductCard";
import { white } from "../../constants/colors";

const ProductsOverviewScreen = ({ navigation }) => {
    let productsList = useSelector((state) => state.products.availableProducts);
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
                        ></ProductCard>
                    );
                }}
            ></FlatList>
        </View>
    );
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({
    container: {
        // flexGrow:1,
        alignItems: "center",
    },
    listContainer: {
        alignItems: "center",
        backgroundColor: white,
    },
});
