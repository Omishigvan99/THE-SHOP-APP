import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT } from "../actions/productsAction";

let initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter((item) => item.ownerId === "u1"),
};

export let productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT: {
            return {
                ...state,
                availableProducts: state.availableProducts.filter((product) => {
                    return product.id !== action.productId;
                }),
                userProducts: state.userProducts.filter((product) => {
                    return product.id !== action.productId;
                }),
            };
        }
    }
    return state;
};
