import { StyleSheet, Text, ScrollView, Image, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import CustomButton from "../../components/CustomButton";
import { accentColor, white } from "../../constants/colors";
import { useEffect } from "react";

const ProductDetailsScreen = ({ navigation, route }) => {
    let productId = route.params.productId;
    let selectedProduct = useSelector((store) =>
        store.products.availableProducts.find((item) => item.id === productId)
    );

    useEffect(() => {
        navigation.setOptions({
            headerTitle: selectedProduct.title,
        });
    }, [navigation]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: selectedProduct.imageUrl }}
                ></Image>
            </View>
            <Text style={styles.price}>{"$ " + selectedProduct.price}</Text>
            <Text style={styles.description}>
                {selectedProduct.description}
            </Text>
            <CustomButton
                title={"ADD TO CART"}
                bgColor={accentColor}
                fgColor={white}
                style={styles.button}
            ></CustomButton>
        </ScrollView>
    );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    imageContainer: {
        height: 350,
        width: "100%",
    },
    image: {
        height: "100%",
        width: "100%",
    },
    price: {
        fontSize: 20,
        color: accentColor,
    },
    description: {
        marginHorizontal: 10,
        fontFamily: "open-sans-regular",
    },
    button: {
        marginBottom: 10,
    },
});
