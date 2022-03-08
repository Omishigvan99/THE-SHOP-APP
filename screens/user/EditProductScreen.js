import {
    StyleSheet,
    View,
    ScrollView,
    Alert,
    ActivityIndicator,
} from "react-native";
import React, { useEffect, useReducer, useState } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/CustomHeaderButton";
import CustomFormInput from "../../components/CustomFormInput";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, editProduct } from "../../store/actions/productsAction";
import { white, primaryColor } from "../../constants/colors";
import { useCallback } from "react";

let UPDATE_FORM = "UPDATE_FROM";
let SET_FORM_DATA = "SET_FORM_DATA";

let formReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_FORM: {
            let updatedInputValues = {
                ...state.inputValues,
                [action.input]: action.value,
            };

            let updateInputValidaties = {
                ...state.inputValidaties,
                [action.input]: action.isValid,
            };
            let isUpdatedFormValid = true;

            for (const key in updateInputValidaties) {
                if (updateInputValidaties[key] === false)
                    isUpdatedFormValid = false;
            }

            return {
                ...state,
                inputValues: updatedInputValues,
                inputValidaties: updateInputValidaties,
                isFormValid: isUpdatedFormValid,
            };
        }
        case SET_FORM_DATA:
            return {
                inputValues: {
                    title: action.title,
                    description: action.description,
                    imageUrl: action.imageUrl,
                    price: action.price,
                },
                inputValidaties: {
                    title: true,
                    description: true,
                    imageUrl: true,
                    price: true,
                },
                isFormValid: true,
            };
        default:
            return state;
    }
};

const EditProductScreen = ({ navigation, route }) => {
    let selectedProduct = useSelector((store) => {
        if (route.params.productId) {
            return store.products.userProducts.find(
                (product) => product.id === route.params.productId
            );
        }
        return null;
    });

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    let dispatch = useDispatch();

    let [form, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: "",
            description: "",
            imageUrl: "",
            price: "",
        },
        inputValidaties: {
            title: false,
            description: false,
            imageUrl: false,
            price: false,
        },
        isFormValid: false,
    });

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
                            onPress={async () => {
                                if (!form.isFormValid) {
                                    Alert.alert(
                                        "Invalid Input Data!!!",
                                        "Please check your input values",
                                        [{ text: "OK", style: "default" }]
                                    );
                                    return;
                                }

                                try {
                                    if (route.params.productId) {
                                        setLoading(true);
                                        await dispatch(
                                            editProduct(
                                                route.params.productId,
                                                form.inputValues.title,
                                                form.inputValues.description,
                                                form.inputValues.imageUrl
                                            )
                                        );
                                        setLoading(false);
                                        navigation.goBack();
                                    } else {
                                        setLoading(true);
                                        await dispatch(
                                            addProduct(
                                                form.inputValues.title,
                                                form.inputValues.description,
                                                form.inputValues.imageUrl,
                                                Number(form.inputValues.price)
                                            )
                                        );
                                        setLoading(false);
                                        navigation.goBack();
                                    }
                                } catch (err) {
                                    setLoading(false);
                                    setError(err);
                                }
                            }}
                        ></Item>
                    </HeaderButtons>
                );
            },
        });
    }, [navigation, form]);

    useEffect(() => {
        if (selectedProduct) {
            dispatchFormState({
                type: SET_FORM_DATA,
                title: selectedProduct.title,
                description: selectedProduct.description,
                imageUrl: selectedProduct.imageUrl,
                price: selectedProduct.price,
            });
        }
    }, [selectedProduct, error]);

    useEffect(() => {
        if (error) {
            Alert.alert("ERROR", "Error editing the product", [
                {
                    text: "OK",
                    style: "cancel",
                    onPress: () => {
                        setError(null);
                    },
                },
            ]);
        }
    }, [error]);

    let inputChangeHandler = useCallback(
        (text, isValid, inputIdentifier) => {
            dispatchFormState({
                type: UPDATE_FORM,
                value: text,
                isValid: isValid,
                input: inputIdentifier,
            });
        },
        [dispatchFormState]
    );

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    size={"large"}
                    color={primaryColor}
                ></ActivityIndicator>
            </View>
        );
    }

    return (
        <ScrollView style={{ backgroundColor: white }}>
            <View style={styles.form}>
                <CustomFormInput
                    label={"Name"}
                    initialValue={form.inputValues.title}
                    initialyValid={form.inputValidaties.title}
                    inputOptions={{
                        autoCapitalize: "sentences",
                        autoCorrect: true,
                    }}
                    required={true}
                    errorMessage="Name should contain at least one charachter"
                    onInputChange={(value, validity) => {
                        inputChangeHandler(value, validity, "title");
                    }}
                    minLength={2}
                ></CustomFormInput>
                <CustomFormInput
                    label={"Description"}
                    initialValue={form.inputValues.description}
                    initialyValid={form.inputValidaties.description}
                    inputOptions={{
                        autoCapitalize: "sentences",
                        autoCorrect: true,
                        multiline: true,
                        numberOfLines: 3,
                    }}
                    required={true}
                    errorMessage="Description should contain at least one charachter"
                    onInputChange={(value, validity) => {
                        inputChangeHandler(value, validity, "description");
                    }}
                    minLength={5}
                ></CustomFormInput>
                <CustomFormInput
                    label={"Image Url"}
                    initialValue={form.inputValues.imageUrl}
                    initialyValid={form.inputValidaties.imageUrl}
                    required={true}
                    errorMessage="Must provide valid image url"
                    onInputChange={(value, validity) => {
                        inputChangeHandler(value, validity, "imageUrl");
                    }}
                ></CustomFormInput>
                {!route.params.productId ? (
                    <CustomFormInput
                        label={"Price"}
                        initialValue={form.inputValues.price}
                        initialyValid={form.inputValidaties.price}
                        inputOptions={{
                            keyboardType: "number-pad",
                        }}
                        onInputChange={(value, validity) => {
                            inputChangeHandler(value, validity, "price");
                        }}
                        required={true}
                        errorMessage={"Price should be greater than zero"}
                        min={0.1}
                    ></CustomFormInput>
                ) : null}
            </View>
        </ScrollView>
    );
};

export default EditProductScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    form: {
        padding: 20,
        backgroundColor: white,
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
