import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { myOrdersActions } from '../store/myOrders';
import axios from 'axios';

import Loader from '../components/Loader'


const Profile = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);

    const myOrders = useSelector((state) => state.myOrders);
    const { loading, orders } = myOrders;
    const dispatchAndGetOrders = async () => {

        dispatch(myOrdersActions.myOrdersRequest());
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }
            const { data } = await axios.get(`/api/orders/myorders`, config);
            // console.log(data);
            dispatch(myOrdersActions.myOrdersSuccess(data));
        } catch (error) {
            dispatch(myOrdersActions.myOrdersRequestClose());
        }

    }

    useEffect(() => {
        if (!userInfo.token) {
            navigate('/login');
        } else {
            dispatchAndGetOrders()
        }
    }, [dispatch, userInfo])


    return (
        <Row>
            <Col md={9}>
                <h2>My Orders</h2>
                {loading ? (
                    <Loader />
                ) : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>

                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice}</td>

                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm' variant='light'>
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default Profile