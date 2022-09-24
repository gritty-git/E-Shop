import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from "react-router";
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import axios from 'axios';
import { orderDetailActions } from '../store/orderDetails';


const Order = () => {
    const location = useLocation();
    const orderId = location.pathname.split("/")[2];
    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetail);
    const { order, loading } = orderDetails;
    const { userInfo } = useSelector((state) => state.auth);
    console.log(order, loading);
    if (Object.keys(order).length) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        var totalPrice = addDecimals(
            order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
    }

    const dispatchAndGet = async (id) => {
        try {

            dispatch(orderDetailActions.orderDetailRequest());
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }
            const { data } = await axios.get(`/api/orders/${id}`, config)
            console.log(data);
            dispatch(orderDetailActions.orderDetailSuccess(data));
        } catch (error) {
            dispatch(orderDetailActions.orderDetailRequestClose());
        }

    }

    useEffect(() => {
        if (orderId) {
            dispatchAndGet(orderId);
        }


    }, [])

    return (Object.keys(order).length == 0) ? (
        <Loader />
    ) : (
        <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong> {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>{' '}
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                                <strong>Address:</strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                {order.shippingAddress.postalCode},{' '}
                                {order.shippingAddress.country}
                            </p>

                        </ListGroup.Item>


                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? (
                                "Order is empty"
                            ) : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Order