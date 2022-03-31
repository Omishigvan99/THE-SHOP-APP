import Order from "../../models/order";
export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const addOrder = (cartItems, totalAmount) => {
    let date = new Date();
    return async (dispatch, getState) => {
        let userId = getState().auth.userId;
        let token = getState().auth.token;
        let response = await fetch(
            `https://the-shop-app-f448d-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userId}.json?auth=${token}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderItems: cartItems,
                    totalAmount: totalAmount,
                    date: date.toISOString(),
                }),
            }
        );

        let result = await response.json();

        dispatch({
            type: ADD_ORDER,
            id: result.name,
            orderItems: cartItems,
            totalAmount: totalAmount,
            date: date,
        });

        // making push notification request when order is placed
        // here we are triggering from inside of app but this is done mostly on server side applications
        for (const cartItem of cartItems) {
            if (cartItem.productOwnerPushToken) {
                await fetch("https://exp.host/--/api/v2/push/send", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Accept-encoding": "gzip,deflate",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        to: cartItem.productOwnerPushToken,
                        title: "Product Ordered",
                        body: `Order for ${cartItem.productTitle} X ${cartItem.productQuantity}`,
                    }),
                });
            }
        }
    };
};

export const setOrders = () => {
    return async (dispatch, getState) => {
        let userId = getState().auth.userId;
        let token = getState().auth.token;
        try {
            let response = await fetch(
                `https://the-shop-app-f448d-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userId}.json?auth=${token}`
            );
            if (!response.ok) {
                throw new Error("Something went wrong!!");
            }
            let result = await response.json();
            let loadedOrders = [];
            for (const key in result) {
                loadedOrders.push(
                    new Order(
                        key,
                        result[key].orderItems,
                        result[key].totalAmount,
                        new Date(result[key].date)
                    )
                );
            }

            dispatch({ type: SET_ORDERS, orders: loadedOrders });
        } catch (err) {
            throw err;
        }
    };
};
