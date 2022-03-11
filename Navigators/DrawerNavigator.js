import React from "react";
import { View, Text } from "react-native";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from "@react-navigation/drawer";
import ShopNavigator from "./ShopNavigator";
import OrderNavigator from "./OrderNavigtor";
import { MyProductNavigtor } from "./MyProductNavigator";
import CustomButton from "../components/CustomButton";
import { accentColor, primaryColor, white } from "../constants/colors";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/actions/authActions";

const Drawer = createDrawerNavigator();

const CustomDrawerItem = (props) => {
    let dispatch = useDispatch();
    return (
        <>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props}></DrawerItemList>
            </DrawerContentScrollView>
            <CustomButton
                title={"LOGOUT"}
                bgColor={primaryColor}
                fgColor={white}
                IconComponent={() => {
                    return (
                        <Ionicons
                            name="md-log-out"
                            size={24}
                            color={white}
                        ></Ionicons>
                    );
                }}
                onPress={() => {
                    dispatch(setCredentials(null, null, false));
                }}
                style={{
                    justifyContent: "space-evenly",
                    paddingHorizontal:70,
                }}
            ></CustomButton>
        </>
    );
};
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: accentColor,
            }}
            drawerContent={CustomDrawerItem}
        >
            <Drawer.Screen
                name="Home"
                component={ShopNavigator}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Entypo name="shop" size={size} color={color} />
                    ),
                    drawerLabel: "Shop",
                    drawerLabelStyle: {
                        fontFamily: "open-sans-bold",
                    },
                }}
            ></Drawer.Screen>
            <Drawer.Screen
                name="Orders"
                component={OrderNavigator}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons
                            name="md-reorder-three"
                            size={size}
                            color={color}
                        />
                    ),
                    drawerLabel: "My Orders",
                    drawerLabelStyle: {
                        fontFamily: "open-sans-bold",
                    },
                }}
            ></Drawer.Screen>
            <Drawer.Screen
                name="User Products"
                component={MyProductNavigtor}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="md-create" size={size} color={color} />
                    ),
                    drawerLabel: "My Products",
                    drawerLabelStyle: {
                        fontFamily: "open-sans-bold",
                    },
                }}
            ></Drawer.Screen>
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
