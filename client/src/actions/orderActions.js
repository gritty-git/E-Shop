import axios from "axios"
import { orderListActions } from "../store/orderList";
import { orderDeliverActions } from "../store/orderDeliver";

export const deliverOrder = async (order, dispatch, userInfo) => {
    try {

        dispatch(orderDeliverActions.orderDeliverRequest());

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(
            `/api/orders/${order._id}/deliver`,
            {},
            config
        )
        dispatch(orderDeliverActions.orderDeliverSuccess(data));

    } catch (error) {
        dispatch(orderDeliverActions.orderDeliverFail(error.response && error.response.data.message
            ? error.response.data.message
            : error.message))

    }
}

export const listOrders = async (dispatch, userInfo) => {
    try {
        dispatch(orderListActions.orderListRequest())

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/orders`, config)

        dispatch(orderListActions.orderListSuccess(data))
    } catch (error) {
        dispatch(orderListActions.orderListFail(error.response && error.response.data.message
            ? error.response.data.message
            : error.message))
    }
}

