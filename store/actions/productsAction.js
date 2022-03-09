import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
    try {
        return async (dispatch, getState) => {
            let userId = getState().auth.userId;
            let response = await fetch(
                "https://the-shop-app-f448d-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
            );

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            let result = await response.json();

            let loadedProducts = [];
            for (const key in result) {
                loadedProducts.push(
                    new Product(
                        key,
                        result[key].ownerId,
                        result[key].title,
                        result[key].imageUrl,
                        result[key].description,
                        parseFloat(result[key].price)
                    )
                );
            }

            let userProducts = loadedProducts.filter((product) => {
                return product.ownerId === userId;
            });

            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts,
                userProducts,
            });
        };
    } catch (err) {
        throw err;
    }
};

export const deleteProduct = (productId) => {
    return async (dispatch, getState) => {
        let token = getState().auth.token;
        await fetch(
            `https://the-shop-app-f448d-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId}.json?auth=${token}`,
            {
                method: "DELETE",
            }
        );

        dispatch({ type: DELETE_PRODUCT, productId: productId });
    };
};

export const addProduct = (title, description, imageUrl, price) => {
    try {
        return async (dispatch, getState) => {
            let token = getState().auth.token;
            let userId = getState().auth.userId;
            let response = await fetch(
                `https://the-shop-app-f448d-default-rtdb.asia-southeast1.firebasedatabase.app/products.json?auth=${token}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title,
                        ownerId: userId,
                        description,
                        imageUrl,
                        price,
                    }),
                }
            );

            let result = await response.json();

            dispatch({
                type: ADD_PRODUCT,
                id: result.name,
                ownerId: userId,
                title,
                description,
                imageUrl,
                price,
            });
        };
    } catch (err) {
        console.log(err);
    }
};

export const editProduct = (pid, title, description, imageUrl) => {
    try {
        return async (dispatch, getState) => {
            let token = getState().auth.token;
            let response = await fetch(
                `https://the-shop-app-f448d-default-rtdb.asia-southeast1.firebasedatabase.app/products/${pid}.json?auth=${token}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title,
                        description,
                        imageUrl,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error();
            }

            dispatch({ type: EDIT_PRODUCT, pid, title, description, imageUrl });
        };
    } catch (err) {
        throw err;
    }
};
