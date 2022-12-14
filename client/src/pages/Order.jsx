import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from "react-router";
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { PayPalButton } from 'react-paypal-button-v2'
import axios from 'axios';
import Message from '../components/Message';
import { PayOrder } from '../actions/payOrder';
import { listOrders, deliverOrder } from '../actions/orderActions'
import { orderDetailActions } from '../store/orderDetails';
import { orderPayActions } from '../store/orderPay';
import { orderDeliverActions } from '../store/orderDeliver';


const Order = () => {
    const location = useLocation();
    const orderId = location.pathname.split("/")[2];
    const dispatch = useDispatch();
    const [sdkReady, setSdkReady] = useState(false)
    const { order: old_order, loading, error } = useSelector((state) => state.orderDetail);
    const order = { ...old_order };
    const { loading: loadingDeliver, success: successDeliver } = useSelector((state) => state.orderDeliver)
    const { loading: loadingPay, success: successPay } = useSelector((state) => state.orderPay);
    console.log(order, loadingPay, sdkReady, successPay);
    const { userInfo } = useSelector((state) => state.auth);
    if (Object.keys(order).length) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        order.itemsPrice = addDecimals(
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
            console.log("data is ", data);
            dispatch(orderDetailActions.orderDetailSuccess(data));
        } catch (error) {
            dispatch(orderDetailActions.orderDetailFail(error.response && error.response.data.message
                ? error.response.data.message
                : error.message));
        }

    }

    useEffect(() => {
        const addPayPalScript = async () => {
            console.log("paypal script ran");
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        console.log(order, successPay)

        if (Object.keys(order).length == 0 || successPay || successDeliver) {
            console.log("dispatching");
            dispatch(orderPayActions.orderPayReset());
            dispatch(orderDeliverActions.orderDeliverReset());
            addPayPalScript()
            dispatchAndGet(orderId);
        } else if (!order.isPaid) {
            console.log("order not paid");
            if (!window.paypal) {
                console.log("ruunning script");
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, orderId, successPay, successDeliver])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        PayOrder(orderId, paymentResult, dispatch, userInfo);

    }

    const deliverHandler = () => {
        deliverOrder(order, dispatch, userInfo)
    }

    return (Object.keys(order).length == 0) ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
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
                            {order.isDelivered ? (
                                <Message variant='success'>
                                    Delivered on {order.deliveredAt}
                                </Message>
                            ) : (
                                <Message variant='danger'>Not Delivered</Message>
                            )}

                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='danger'>Not Paid</Message>
                            )}
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
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}
                            {loadingDeliver && <Loader />}
                            {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button
                                        type='button'
                                        className='btn btn-block'
                                        onClick={deliverHandler}
                                    >
                                        Mark As Delivered
                                    </Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Order