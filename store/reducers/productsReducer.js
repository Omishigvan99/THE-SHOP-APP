import { uniqueId } from "lodash";
import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
import {
    ADD_PRODUCT,
    DELETE_PRODUCT,
    EDIT_PRODUCT,
    SET_PRODUCTS,
} from "../actions/productsAction";

let initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter((item) => item.ownerId === "u1"),
};

export let productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS: {
            return {
                ...state,
                availableProducts: action.products,
                userProducts: action.products,
            };
        }
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
        case ADD_PRODUCT: {
            let newProduct = new Product(
                action.id,
                "u1",
                action.title,
                action.imageUrl,
                action.description,
                action.price
            );

            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct),
            };
        }
        case EDIT_PRODUCT: {
            let productIndex = state.userProducts.findIndex((product) => {
                return product.id === action.pid;
            });

            let editedProduct = new Product(
                action.pid,
                state.userProducts[productIndex].ownerId,
                action.title,
                action.imageUrl,
                action.description,
                state.userProducts[productIndex].price
            );
            let updatedUserProducts = [...state.userProducts];
            updatedUserProducts[productIndex] = editedProduct;

            productIndex = state.availableProducts.findIndex((product) => {
                return product.id === action.pid;
            });

            let updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[productIndex] = editedProduct;

            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts,
            };
        }
    }
    return state;
};
