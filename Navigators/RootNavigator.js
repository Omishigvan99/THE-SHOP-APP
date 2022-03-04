import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ShopNavigator from "./ShopNavigator";
import OrderNavigator from "./OrderNavigtor";
import { MyProductNavigtor } from "./MyProductNavigator";
import { accentColor } from "../constants/colors";
import { Ionicons, Entypo } from "@expo/vector-icons";

let Drawer = createDrawerNavigator();

export default RootNavigator = (props) => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false,
                    drawerActiveTintColor: accentColor,
                }}
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
                            <Ionicons
                                name="md-create"
                                size={size}
                                color={color}
                            />
                        ),
                        drawerLabel: "My Products",
                        drawerLabelStyle: {
                            fontFamily: "open-sans-bold",
                        },
                    }}
                ></Drawer.Screen>
            </Drawer.Navigator>
        </NavigationContainer>
    );
};
