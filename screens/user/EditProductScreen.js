import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/CustomHeaderButton";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addProduct, editProduct } from "../../store/actions/productsAction";

const EditProductScreen = ({ navigation, route }) => {
    let selectedProduct = useSelector((store) => {
        if (route.params.productId) {
            return store.products.userProducts.find(
                (product) => product.id === route.params.productId
            );
        }
        return null;
    });

    let dispatch = useDispatch();

    const [title, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        navigation.setOptions({
            headerTitle: route.params.productId
                ? "Edit Product"
                : "Add Product",
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item
                            name="save"
                            iconName="md-checkmark"
                            onPress={() => {
                                if (route.params.productId) {
                                    console.log("Edit Call");
                                    dispatch(
                                        editProduct(
                                            route.params.productId,
                                            title,
                                            description,
                                            imageUrl
                                        )
                                    );
                                } else {
                                    console.log("Add Call");
                                    dispatch(
                                        addProduct(
                                            title,
                                            description,
                                            imageUrl,
                                            Number(price)
                                        )
                                    );
                                }
                            }}
                        ></Item>
                    </HeaderButtons>
                );
            },
        });
    }, [navigation, title, description, imageUrl, price]);

    useEffect(() => {
        if (selectedProduct) {
            setName(selectedProduct.title);
            setDescription(selectedProduct.description);
            setImageUrl(selectedProduct.imageUrl);
            setPrice(selectedProduct.price.toString());
        }
    }, [selectedProduct]);

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Name</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={(enteredValue) => {
                            setName(enteredValue);
                        }}
                    ></TextInput>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={(enteredValue) => {
                            setDescription(enteredValue);
                        }}
                    ></TextInput>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={(enteredValue) => {
                            setImageUrl(enteredValue);
                        }}
                    ></TextInput>
                </View>
                {!route.params.productId ? (
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Price</Text>
                        <TextInput
                            style={styles.input}
                            value={price}
                            onChangeText={(enteredValue) => {
                                setPrice(enteredValue);
                            }}
                        ></TextInput>
                    </View>
                ) : null}
            </View>
        </ScrollView>
    );
};

export default EditProductScreen;

const styles = StyleSheet.create({
    form: {
        padding: 20,
    },
    inputContainer: {
        marginVertical: 5,
    },
    inputLabel: {
        fontFamily: "open-sans-bold",
        color: "#777",
    },
    input: {
        marginVertical: 5,
        borderBottomWidth: 2,
        borderBottomColor: "#AAA",
        fontFamily: "open-sans-regular",
        fontSize: 18,
    },
});
