import { StyleSheet, View, FlatList } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

import ProductCard from "../../components/ProductCard";
import CustomButton from "../../components/CustomButton";
import { white, accentColor } from "../../constants/colors";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions/cartActions";

const ProductsOverviewScreen = ({ navigation }) => {
    let productsList = useSelector((state) => state.products.availableProducts);
    let dispatch = useDispatch();

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
    },
    listContainer: {
        alignItems: "center",
        backgroundColor: white,
    },
});
