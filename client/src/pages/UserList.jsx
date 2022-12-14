import { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { usersActions } from '../store/users'
import axios from 'axios'
import Message from './../components/Message';
import { useNavigate } from 'react-router-dom'
import { deleteUser } from '../actions/deleteUser'

const UserList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { users, loading, error } = useSelector((state) => state.users);
    const { error: deleteError, success, loading: deleteLoading } = useSelector((state) => state.deleteUser)
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
            dispatch(usersActions.usersRequestFail(error.response && error.response.data.message
                ? error.response.data.message
                : error.message));
        }

    }

    useEffect(() => {
        // if (userInfo && userInfo.isAdmin) dispatchAndGetUsers()
        // else navigate('/login')
        dispatchAndGetUsers()
    }, [dispatch, success, userInfo])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteUser(id, dispatch, userInfo))
        }

    }

    return (
        <>
            <h1>Users</h1>
            {loading ? (
                <Loader />
            ) : error ?
                <Message variant='danger'>{error}</Message>
                : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
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
                                    <td>
                                        {user.isAdmin ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() => deleteHandler(user._id)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
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