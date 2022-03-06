export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";

export const deleteProduct = (productId) => {
    return { type: DELETE_PRODUCT, productId: productId };
};

export const addProduct = (title, description, imageUrl, price) => {
    return { type: ADD_PRODUCT, title, description, imageUrl, price };
};

export const editProduct = (pid, title, description, imageUrl) => {
    return { type: EDIT_PRODUCT, pid, title, description, imageUrl };
};
