import { orderPayActions } from '../store/orderPay';
import axios from 'axios';

export const PayOrder = async (orderId, paymentResult, dispatch, userInfo) => {
    //const dispatch = useDispatch();
    // const { userInfo } = useSelector((state) => state.auth);
    try {
        dispatch(orderPayActions.orderPayRequest());

        console.log("came here");
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