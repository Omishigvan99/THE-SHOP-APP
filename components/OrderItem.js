import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { accentColor, white } from "../constants/colors";

const OrderItem = ({ orderId, totalAmount, date, orderItems }) => {
    let [showDetails, setShowDetails] = useState(false);

    return (
        <>
            <Text style={styles.id}>Order ID:{orderId}</Text>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>
                    {"$" + totalAmount.toFixed(2)}
                </Text>
                <Text style={styles.date}>{date}</Text>
            </View>
            <CustomButton
                title={showDetails ? "HIDE DETAILS" : "SHOW DETAILS"}
                bgColor={white}
                fgColor={accentColor}
                containerStyle={{
                    borderWidth: 2,
                    borderColor: accentColor,
                    borderRadius: 9999,
                    overflow: "hidden",
                }}
                onPress={() => {
                    setShowDetails((prevState) => !prevState);
                }}
            ></CustomButton>
            {showDetails && (
                <FlatList
                    style={styles.listContainer}
                    data={orderItems}
                    renderItem={(itemData) => {
                        return (
                            <View
                                style={{
                                    ...styles.itemContainer,
                                    borderTopWidth:
                                        itemData.index === 0 ? 1 : 0,
                                }}
                            >
                                <View style={styles.imageContainer}>
                                    <Image
                                        style={styles.image}
                                        source={{
                                            uri: itemData.item.productImage,
                                        }}
                                    ></Image>
                                </View>
                                <View style={styles.itemInfoContainer}>
                                    <Text style={{ ...styles.itemInfo }}>
                                        {itemData.item.productTitle}
                                    </Text>
                                    <Text style={{ ...styles.itemInfo }}>
                                        {`$${itemData.item.productPrice.toFixed(
                                            2
                                        )} X ${
                                            itemData.item.productQuantity
                                        } = `}
                                        <Text
                                            style={{
                                                ...styles.itemInfo,
                                                ...styles.sumAmount,
                                            }}
                                        >{`$${itemData.item.productSum.toFixed(
                                            2
                                        )}`}</Text>
                                    </Text>
                                </View>
                            </View>
                        );
                    }}
                    keyExtractor={(item) => {
                        return item.productId;
                    }}
                ></FlatList>
            )}
        </>
    );
};

export default OrderItem;

const styles = StyleSheet.create({
    container: {
        width: "90%",
        alignSelf: "center",
        backgroundColor: white,
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        shadowRadius: 8,
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 5,
    },
    summary: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    id: {
        fontFamily: "open-sans-bold",
        fontSize: 16,
    },
    totalAmount: {
        fontFamily: "open-sans-bold",
        color: accentColor,
        fontSize: 16,
    },
    date: {
        fontFamily: "open-sans-regular",
        color: "#777",
        fontSize: 16,
    },
    listContainer: {
        marginVertical: 10,
    },
    itemContainer: {
        flexDirection: "row",
        padding: 10,
        borderWidth: 1,
        borderColor: "#CCC",
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
    },
    imageContainer: {
        height: 70,
        width: 70,
    },
    image: {
        height: "100%",
    },
    itemInfoContainer: {
        justifyContent: "space-evenly",
        paddingLeft: 10,
    },
    itemInfo: {
        fontSize: 16,
        fontFamily: "open-sans-regular",
    },
    sumAmount: {
        color: accentColor,
        fontFamily: "open-sans-bold",
    },
});
