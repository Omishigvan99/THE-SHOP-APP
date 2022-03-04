import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyOrdersScreen from "../screens/shop/MyOrdersScreen";
import { primaryColor, white } from "../constants/colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";

let Stack = createNativeStackNavigator();

const OrderNavigtor = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor:
                        Platform.OS === "android" ? primaryColor : white,
                },
                headerTitleStyle: {
                    fontFamily: "open-sans-bold",
                },
                headerTintColor:
                    Platform.OS === "android" ? white : primaryColor,
            }}
        >
            <Stack.Screen
                name={"My Orders"}
                component={MyOrdersScreen}
                options={({ navigation }) => {
                    return {
                        headerLeft: () => {
                            return (
                                <HeaderButtons
                                    HeaderButtonComponent={CustomHeaderButton}
                                >
                                    <Item
                                        title="cart"
                                        iconName="md-menu"
                                        onPress={() => {
                                            navigation.toggleDrawer();
                                        }}
                                    ></Item>
                                </HeaderButtons>
                            );
                        },
                    };
                }}
            ></Stack.Screen>
        </Stack.Navigator>
    );
};

export default OrderNavigtor;
