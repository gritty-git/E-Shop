import axios from 'axios';
import { deleteUserActions } from '../store/deleteUser';

export const deleteUser = async (id, dispatch, userInfo) => {
    try {
        dispatch(deleteUserActions.deleteUserRequest());

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.delete(`/api/users/${id}`, config)

        dispatch(deleteUserActions.deleteUserSuccess(data));
    } catch (error) {
        dispatch(deleteUserActions.deleteUserRequestFail(error.response && error.response.data.message
            ? error.response.data.message
            : error.message));

    }
}