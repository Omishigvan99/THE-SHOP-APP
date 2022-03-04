import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import ShopCartScreen from "../screens/shop/ShopCartScreen";
import { primaryColor, white } from "../constants/colors";
import { Platform } from "react-native";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

const Stack = createNativeStackNavigator();

export default ShopNavigator = (props) => {
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
                name="Shop"
                component={ProductsOverviewScreen}
                options={({ navigation }) => ({
                    headerRight: () => {
                        return (
                            <HeaderButtons
                                HeaderButtonComponent={CustomHeaderButton}
                            >
                                <Item
                                    title="cart"
                                    iconName="md-cart"
                                    onPress={() => {
                                        navigation.navigate({
                                            name: "Shop Cart",
                                        });
                                    }}
                                ></Item>
                            </HeaderButtons>
                        );
                    },
                    headerLeft: () => {
                        return (
                            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
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
                })}
            ></Stack.Screen>
            <Stack.Screen
                name="Product Details"
                component={ProductDetailsScreen}
                options={{
                    headerTitle: "ProductDetails",
                }}
            ></Stack.Screen>
            <Stack.Screen
                name="Shop Cart"
                component={ShopCartScreen}
            ></Stack.Screen>
        </Stack.Navigator>
    );
};
