import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CardContainer from "../../components/CardContainer";
import CustomButton from "../../components/CustomButton";
import OrderItem from "../../components/OrderItem";
import { accentColor, primaryColor, white } from "../../constants/colors";
import { useDispatch } from "react-redux";
import { setOrders } from "../../store/actions/orderActions";
import { useFocusEffect } from "@react-navigation/native";

const MyOrdersScreen = () => {
    let ordersList = useSelector((store) => store.order.orders);
    let dispatch = useDispatch();

    let [error, setError] = useState(null);
    let [isLoading, setLoading] = useState(false);
    let [isRefreshing, setRefreshing] = useState(false);

    let loadOrders = useCallback(async () => {
        try {
            setRefreshing(true);
            await dispatch(setOrders());
            setRefreshing(false);
        } catch (err) {
            setError(err.message);
        }
    }, [dispatch]);

    useEffect(() => {
        setLoading(true);
        loadOrders().then(() => {
            setLoading(false);
        });
    }, [loadOrders, error]);

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            loadOrders().then(() => {
                setLoading(false);
            });
        }, [loadOrders])
    );

    if (error) {
        return (
            <View style={styles.errorContainer}>
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
            <View style={styles.errorContainer}>
                <ActivityIndicator
                    size={"large"}
                    color={primaryColor}
                ></ActivityIndicator>
            </View>
        );
    }

    if (!isLoading && ordersList.length === 0) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.info}>
                    Nothing to show here! Place some orders.
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                onRefresh={loadOrders}
                refreshing={isRefreshing}
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
    info: {
        fontFamily: "open-sans-regular",
        fontSize: 16,
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
