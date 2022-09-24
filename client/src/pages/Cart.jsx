import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { cartActions } from '../store/cart';
import axios from 'axios';


const Cart = () => {

    const location = useLocation();
    const productId = (location.pathname.split('/')[2]);
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const dispatchAndStore = async (productId, qty) => {
        const { data } = await axios.get(`/api/products/${productId}`);
        const payload = {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty,
        }
        dispatch(cartActions.addItem(payload));
    }
    const isAuthenticated = useSelector((state) => state.auth.authenticated);
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart;
    console.log(location, qty, productId, cart);
    useEffect(() => {
        if (productId) {
            dispatchAndStore(productId, qty);
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(cartActions.deleteItem(id));
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    const checkoutHandler = () => {

        if (isAuthenticated) {
            navigate(`/shipping`);
        } else {
            navigate('/login');
        }
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <><p>Your cart is empty</p>
                        <Link to='/'>Go Back</Link></>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as='select'
                                            value={item.qty}
                                            onChange={(e) =>

                                                dispatchAndStore(item.product, Number(e.target.value))

                                            }
                                        >
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            type='button'
                                            variant='light'
                                            onClick={() => removeFromCartHandler(item.product)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>
                                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                                items
                            </h2>
                            $
                            {cartItems
                                .reduce((acc, item) => acc + item.qty * item.price, 0)
                                .toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default Cart;