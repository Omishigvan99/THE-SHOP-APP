import Order from "../../models/order";
export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const addOrder = (cartItems, totalAmount) => {
    let date = new Date();
    return async (dispatch) => {
        let response = await fetch(
            "https://the-shop-app-f448d-default-rtdb.asia-southeast1.firebasedatabase.app/orders/u1.json",
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
        console.log(result);

        dispatch({
            type: ADD_ORDER,
            id: result.name,
            orderItems: cartItems,
            totalAmount: totalAmount,
            date: date,
        });
    };
};

export const setOrders = () => {
    return async (dispatch) => {
        try {
            let response = await fetch(
                "https://the-shop-app-f448d-default-rtdb.asia-southeast1.firebasedatabase.app/orders/u1.json"
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
