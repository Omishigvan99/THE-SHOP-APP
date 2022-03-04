import { CartItem } from "../../models/cartItem";
import {
    ADD_TO_CART,
    DECREMENT_QUANTITY,
    EMPTY_CART,
    INCREMENT_QUANTITY,
    REMOVE_FROM_CART,
} from "../actions/cartActions";
import { DELETE_PRODUCT } from "../actions/productsAction";

const initialState = {
    items: {},
    totalAmount: 0,
};

export let cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
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
                    action.product.price,
                    action.product.imageUrl
                );
                updatedState = {
                    ...state,
                    items: { ...state.items, [action.product.id]: cartItem },
                    totalAmount: state.totalAmount + action.product.price,
                };
            }
            return updatedState;
        }
        case INCREMENT_QUANTITY: {
            let updatedState = {
                ...state,
                items: {
                    ...state.items,
                    [action.productId]: {
                        ...state.items[action.productId],
                        quantity: state.items[action.productId].quantity + 1,
                        sum:
                            state.items[action.productId].sum +
                            state.items[action.productId].price,
                    },
                },
                totalAmount:
                    state.totalAmount + state.items[action.productId].price,
            };
            return updatedState;
        }
        case DECREMENT_QUANTITY: {
            let updatedState = {
                ...state,
                items: {
                    ...state.items,
                    [action.productId]: {
                        ...state.items[action.productId],
                        quantity: state.items[action.productId].quantity - 1,
                        sum:
                            state.items[action.productId].sum -
                            state.items[action.productId].price,
                    },
                },
                totalAmount:
                    state.totalAmount - state.items[action.productId].price,
            };
            return updatedState;
        }
        case REMOVE_FROM_CART: {
            let updatedState = {
                ...state,
                totalAmount:
                    state.totalAmount - state.items[action.productId].sum,
            };
            delete updatedState.items[action.productId];
            return updatedState;
        }
        case EMPTY_CART:
            return initialState;
        case DELETE_PRODUCT: {
            if (state.items[action.productId]) {
                let updatedState = {
                    ...state,
                    totalAmount:
                        state.totalAmount - state.items[action.productId].sum,
                };
                delete updatedState.items[action.productId];
                return updatedState;
            }

            return state;
        }
        default:
            return state;
    }
};
