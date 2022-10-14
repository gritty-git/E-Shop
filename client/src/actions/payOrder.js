import { useDispatch, useSelector } from 'react-redux';
import { orderPayActions } from '../store/orderPay';

export const payOrder = async (orderId, paymentResult) => {
    const dispatch = useDispatch();
    try {
        dispatch(orderPayActions.orderPayRequest());
        const { userInfo } = useSelector((state) => state.auth);

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(
            `/api/orders/${orderId}/pay`,
            paymentResult,
            config
        )

        dispatch(orderPayActions.orderPaySuccess(data));
    } catch (error) {
        dispatch(orderPayActions.orderPaySuccess(error.response && error.response.data.message
            ? error.response.data.message
            : error.message));

    }
}