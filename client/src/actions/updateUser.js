import axios from 'axios';
import { updateUserActions } from '../store/updateUser';

export const updateUser = async (user, dispatch, userInfo) => {
    console.log("update");
    try {
        dispatch(updateUserActions.updateUserRequest());

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(`/api/users/${user._id}`, user, config)
        dispatch(updateUserActions.updateUserSuccess(data));
    } catch (error) {
        dispatch(updateUserActions.updateUserRequestFail(error.response && error.response.data.message
            ? error.response.data.message
            : error.message));
    }
}