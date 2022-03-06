import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

import CardContainer from "../../components/CardContainer";
import OrderItem from "../../components/OrderItem";
import { white } from "../../constants/colors";

const MyOrdersScreen = () => {
    let ordersList = useSelector((store) => store.order.orders);
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.orderList}
                contentContainerStyle={styles.orderListContainer}
                data={ordersList}
                renderItem={(itemData) => {
                    return (
                        <CardContainer style={styles.cardContainer}>
                            <OrderItem
                                orderId={itemData.item.id}
                                totalAmount={itemData.item.totalAmount}
                                orderItems={itemData.item.orderItems}
                                date={itemData.item.readableDate}
                            ></OrderItem>
                        </CardContainer>
                    );
                }}
            ></FlatList>
        </View>
    );
};

export default MyOrdersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    cardContainer: {
        alignSelf: "center",
        padding: 10,
    },
    orderListContainer: {
        flexGrow: 1,
        paddingBottom: 10,
    },
    orderList: {
        backgroundColor: white,
        width: "100%",
        paddingVertical: 10,
    },
});
