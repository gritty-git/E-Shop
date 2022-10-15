import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router";
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails } from './../actions/getUserDetails'
import { updateUser } from '../actions/updateUser';
import { updateUserActions } from '../store/updateUser';

const UserEdit = () => {

    const location = useLocation();
    console.log(location.pathname.split("/")[3]);
    const userId = location.pathname.split("/")[3];
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.auth);
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = useSelector((state) => state.updateUser);
    useEffect(() => {
        console.log("came here", user);
        if (successUpdate) {
            dispatch(updateUserActions.updateUserReset());
            navigate('/admin/userlist')
        } else {
            if (!user.name || user._id !== userId) {

                getUserDetails(userId, dispatch, userInfo);
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [dispatch, userId, user, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        updateUser({ _id: userId, name, email, isAdmin }, dispatch, userInfo);
    }

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='isadmin'>
                            <Form.Check
                                type='checkbox'
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default UserEdit