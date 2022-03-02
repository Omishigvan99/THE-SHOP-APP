import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { productsReducer } from "./store/reducers/productsReducer";
import { cartReducer } from "./store/reducers/cartReducer";

import RootNavigator from "./Navigators/RootNavigator";
import { useFonts } from "expo-font";

let store = createStore(
    combineReducers({
        products: productsReducer,
        cart: cartReducer,
    }),
);

export default function App() {
    let [loaded] = useFonts({
        "open-sans-regular": require("./assets/Open_Sans/static/OpenSans/OpenSans-Regular.ttf"),
        "open-sans-italic": require("./assets/Open_Sans/static/OpenSans/OpenSans-Italic.ttf"),
        "open-sans-bold": require("./assets/Open_Sans/static/OpenSans/OpenSans-Bold.ttf"),
    });

    if (!loaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <RootNavigator></RootNavigator>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
