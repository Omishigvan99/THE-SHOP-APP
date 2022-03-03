export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREMENT_QUANTITY = "INCREMENT_QUANTITY";
export const DECREMENT_QUANTITY = "DECREMENT_QUANTITY";

export const addToCart = (product) => {
    return { type: ADD_TO_CART, product: product };
};

export const removeFromCart = (productId) => {
    return { type: REMOVE_FROM_CART, productId: productId };
};

export const incrementQuantity = (productId) => {
    return { type: INCREMENT_QUANTITY, productId: productId };
};

export const decrementQuantity = (productId) => {
    return { type: DECREMENT_QUANTITY, productId: productId };
};
