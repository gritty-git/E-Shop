import { ProductsActions } from "../store/products";
import axios from "axios";
import { deleteProductActions } from "../store/deleteProduct";
import { createProductActions } from "../store/createProduct";
import { ProductbyIdActions } from "../store/productById";
import { updateProductActions } from "../store/updateProduct";
import { ProductCreateReviewActions } from "../store/productCreateReview";

export const listProducts = async (keyword = '', pageNumber = '', dispatch) => {
    console.log("called");
    try {
        dispatch(ProductsActions.request());

        const { data } = await axios.get(`/api/products?keyword=${keyword ? keyword : ""}&pageNumber=${pageNumber}`)
        console.log(data);
        dispatch(ProductsActions.success(data));
    } catch (error) {
        dispatch(ProductsActions.failure(error.response && error.response.data.message
            ? error.response.data.message
            : error.message))

    }
}
export const listProductDetails = async (id, dispatch) => {
    try {
        dispatch(ProductbyIdActions.request());

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch(ProductbyIdActions.success(data));

    } catch (error) {
        dispatch(ProductbyIdActions.failure(error.response && error.response.data.message
            ? error.response.data.message
            : error.message))

    }
}

export const deleteProduct = async (id, dispatch, userInfo) => {
    try {
        dispatch(deleteProductActions.deleteProductRequest());

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`/api/products/${id}`, config);

        dispatch(deleteProductActions.deleteProductSuccess());
    } catch (error) {
        dispatch(deleteProductActions.deleteProductFail(error.response && error.response.data.message
            ? error.response.data.message
            : error.message))

    }
}

export const createProduct = async (dispatch, userInfo) => {
    try {
        dispatch(createProductActions.createProductRequest());

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`/api/products`, {}, config)
        dispatch(createProductActions.createProductSuccess(data));

    } catch (error) {
        dispatch(createProductActions.createProductFail(error.response && error.response.data.message
            ? error.response.data.message
            : error.message))
    }
}

export const updateProduct = async (product, dispatch, userInfo) => {
    try {

        dispatch(updateProductActions.updateProductRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(
            `/api/products/${product._id}`,
            product,
            config
        )
        dispatch(updateProductActions.updateProductSuccess(data));

    } catch (error) {
        dispatch(updateProductActions.updateProductFail(error.response && error.response.data.message
            ? error.response.data.message
            : error.message));

    }
}

export const createProductReview = async (
    productId,
    review,
    dispatch,
    userInfo
) => {
    try {
        dispatch(ProductCreateReviewActions.request());

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.post(`/api/products/${productId}/reviews`, review, config)
        dispatch(ProductCreateReviewActions.success());

    } catch (error) {
        dispatch(ProductCreateReviewActions.failure(error.response && error.response.data.message
            ? error.response.data.message
            : error.message))

    }
}