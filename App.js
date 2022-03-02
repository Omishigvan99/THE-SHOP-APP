import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { productsReducer } from "./store/reducers/productsReducer";

import RootNavigator from "./Navigators/RootNavigator";

let store = createStore(
    combineReducers({
        products: productsReducer,
    })
);

export default function App() {
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
