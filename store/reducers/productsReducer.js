import PRODUCTS from "../../data/dummy-data";

let initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter((item) => item.ownerId === "u1"),
};

export let productsReducer = (state = initialState, action) => {
    return state;
};
