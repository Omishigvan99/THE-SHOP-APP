import { StyleSheet, View, FlatList, Alert } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";
import CustomButton from "../../components/CustomButton";
import { white, accentColor } from "../../constants/colors";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../store/actions/productsAction";

const MyProductsScreen = ({ navigation }) => {
    let userProductsList = useSelector((store) => store.products.userProducts);
    let dispatch = useDispatch();
    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.listContainer}
                style={{ width: "100%" }}
                data={userProductsList}
                renderItem={(itemData) => {
                    return (
                        <ProductCard
                            navigation={navigation}
                            productDetails={itemData.item}
                            routeName={"My Product Details"}
                        >
                            <CustomButton
                                title="EDIT"
                                bgColor={accentColor}
                                fgColor={white}
                                onPress={() => {
                                    navigation.navigate({
                                        name: "Edit Product",
                                        params: {
                                            productId: itemData.item.id,
                                        },
                                    });
                                }}
                            ></CustomButton>
                            <CustomButton
                                title="DELETE"
                                bgColor={accentColor}
                                fgColor={white}
                                onPress={() => {
                                    Alert.alert(
                                        "Are You Sure?",
                                        "Do you want to delete the product " +
                                            itemData.item.title,
                                        [
                                            { text: "No", style: "cancel" },
                                            {
                                                text: "Yes",
                                                style: "destructive",
                                                onPress: () => {
                                                    dispatch(
                                                        deleteProduct(
                                                            itemData.item.id
                                                        )
                                                    );
                                                },
                                            },
                                        ]
                                    );
                                }}
                                containerStyle={{
                                    marginTop: 1,
                                }}
                            ></CustomButton>
                        </ProductCard>
                    );
                }}
            ></FlatList>
        </View>
    );
};

export default MyProductsScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    listContainer: {
        alignItems: "center",
        backgroundColor: white,
    },
});
