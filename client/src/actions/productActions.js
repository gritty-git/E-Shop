import { ProductsActions } from "../store/products";
import axios from "axios";
import { deleteProductActions } from "../store/deleteProduct";

export const listProducts = async (dispatch) => {

    try {
        dispatch(ProductsActions.request());

        const { data } = await axios.get('/api/products')
        console.log(data.products);
        dispatch(ProductsActions.success(data.products));
    } catch (error) {
        dispatch(ProductsActions.failure(error.response && error.response.data.message
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