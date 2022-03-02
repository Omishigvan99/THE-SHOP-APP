import { CartItem } from "../../models/cartItem";
import { ADD_TO_CART } from "../actions/cartActions";

const initialState = {
    items: {},
    totalAmount: 0,
};

export let cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            let updatedState;
            if (state.items[action.product.id]) {
                updatedState = {
                    ...state,
                    items: {
                        ...state.items,
                        [action.product.id]: {
                            ...state.items[action.product.id],
                            quantity:
                                state.items[action.product.id].quantity + 1,
                            sum:
                                state.items[action.product.id].sum +
                                action.product.price,
                        },
                    },
                    totalAmount: state.totalAmount + action.product.price,
                };
            } else {
                let cartItem = new CartItem(
                    1,
                    action.product.title,
                    action.product.price,
                    action.product.price
                );
                updatedState = {
                    ...state,
                    items: { ...state.items, [action.product.id]: cartItem },
                    totalAmount: state.totalAmount + action.product.price,
                };
            }
            console.log(updatedState);
            return updatedState;
        default:
            return state;
    }
};
