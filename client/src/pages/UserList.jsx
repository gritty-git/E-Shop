import { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { usersActions } from '../store/users'
import axios from 'axios'

const UserList = () => {
    const dispatch = useDispatch()

    const { users, loading } = useSelector((state) => state.users);
    const { userInfo } = useSelector((state) => state.auth);
    const dispatchAndGetUsers = async () => {

        dispatch(usersActions.usersRequest());
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }
            const { data } = await axios.get(`/api/users`, config);
            // console.log(data);
            dispatch(usersActions.usersSuccess(data));
        } catch (error) {
            dispatch(usersActions.usersRequestClose());
        }

    }

    useEffect(() => {
        dispatchAndGetUsers()
    }, [dispatch])



    return (
        <>
            <h1>Users</h1>
            {loading ? (
                <Loader />
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>

                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}>{user.email}</a>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default UserList