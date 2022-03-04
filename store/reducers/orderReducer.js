import Order from "../../models/order";
import { ADD_ORDER } from "../actions/orderActions";
import { uniqueId } from "lodash";

const initialState = {
    orders: [],
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER: {
            let order = new Order(
                uniqueId("OD"),
                action.orderItems,
                action.totalAmount,
                new Date()
            );

            return {
                orders: state.orders.concat([order]),
            };
        }
        default:
            return state;
    }
};
