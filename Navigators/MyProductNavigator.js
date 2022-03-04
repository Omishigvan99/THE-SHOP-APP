import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyProductsScreen from "../screens/user/MyProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import { primaryColor, white } from "../constants/colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";

const Stack = createNativeStackNavigator();

export const MyProductNavigtor = () => {
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
                name="My Products"
                component={MyProductsScreen}
                options={({ navigation }) => ({
                    headerLeft: () => {
                        return (
                            <HeaderButtons
                                HeaderButtonComponent={CustomHeaderButton}
                            >
                                <Item
                                    title="menu"
                                    iconName="md-menu"
                                    onPress={() => {
                                        navigation.toggleDrawer();
                                    }}
                                ></Item>
                            </HeaderButtons>
                        );
                    },
                    headerRight: () => {
                        return (
                            <HeaderButtons
                                HeaderButtonComponent={CustomHeaderButton}
                            >
                                <Item
                                    title="add"
                                    iconName="md-add"
                                    onPress={() => {
                                        navigation.navigate({
                                            name: "Edit Product",
                                            params: {},
                                        });
                                    }}
                                ></Item>
                            </HeaderButtons>
                        );
                    },
                })}
            ></Stack.Screen>
            <Stack.Screen
                name="Edit Product"
                component={EditProductScreen}
            ></Stack.Screen>
            <Stack.Screen
                name="My Product Details"
                component={ProductDetailsScreen}
            ></Stack.Screen>
        </Stack.Navigator>
    );
};
