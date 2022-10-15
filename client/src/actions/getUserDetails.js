import axios from 'axios';
import { userDetailsActions } from '../store/userDetails';

export const getUserDetails = async (id, dispatch, userInfo) => {
    //const dispatch = useDispatch();
    // const { userInfo } = useSelector((state) => state.auth);
    try {
        dispatch(userDetailsActions.userDetailsRequest());

        const config = {
            headers: {

                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/users/${id}`, config)

        dispatch(userDetailsActions.userDetailsSuccess(data));
    } catch (error) {
        dispatch(userDetailsActions.userDetailsRequestFail(error.response && error.response.data.message
            ? error.response.data.message
            : error.message));

    }
}