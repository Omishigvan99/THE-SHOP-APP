import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers, applyMiddleware } from "redux";
import * as Notification from "expo-notifications";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { productsReducer } from "./store/reducers/productsReducer";
import { cartReducer } from "./store/reducers/cartReducer";
import { orderReducer } from "./store/reducers/orderReducer";

import RootNavigator from "./Navigators/RootNavigator";
import { useFonts } from "expo-font";
import { authReducer } from "./store/reducers/authReducer";

enableScreens();

Notification.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldShowAlert: true,
        };
    },
});

let store = createStore(
    combineReducers({
        products: productsReducer,
        cart: cartReducer,
        order: orderReducer,
        auth: authReducer,
    }),
    applyMiddleware(ReduxThunk)
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
