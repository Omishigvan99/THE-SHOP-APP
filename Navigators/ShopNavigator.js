import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import { primaryColor, white } from "../constants/colors";
import { Platform } from "react-native";

const Stack = createNativeStackNavigator();

export default ShopNavigator = (props) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor:
                        Platform.OS === "android" ? primaryColor : white,
                },
                headerTintColor:
                    Platform.OS === "android" ? white : primaryColor,
            }}
        >
            <Stack.Screen
                name="Shop"
                component={ProductsOverviewScreen}
            ></Stack.Screen>
            <Stack.Screen
                name="Product Details"
                component={ProductDetailsScreen}
            ></Stack.Screen>
        </Stack.Navigator>
    );
};
