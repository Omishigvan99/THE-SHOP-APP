import Order from "../../models/order";
import { ADD_ORDER, SET_ORDERS } from "../actions/orderActions";

const initialState = {
    orders: [],
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER: {
            let order = new Order(
                action.id,
                action.orderItems,
                action.totalAmount,
                action.date
            );

            return {
                orders: state.orders.concat([order]),
            };
        }

        case SET_ORDERS:{
            return {
                orders:action.orders
            }
        }
        default:
            return state;
    }
};
