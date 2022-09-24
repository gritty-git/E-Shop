import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { orderCreateActions } from './../store/order';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Loader from '../components/Loader';

const PlaceOrder = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart)
  const { order, loading, success } = useSelector((state) => state.orderCreate);
  const { userInfo } = useSelector((state) => state.auth);

  const totalPrice = cart.cartItems.reduce((acc, item) => 0 + item.price * item.qty, 0);

  // useEffect(() => {
  //   if (success) {

  //   }

  // }, [success, order])
  //console.log(order, loading, success);

  const placeOrderHandler = async () => {
    dispatch(orderCreateActions.orderCreateRequest());

    // console.log(order, loading, success, orderCreateActions);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    console.log("data");
    try {
      const { data } = await axios.post(`/api/orders`, { ...cart, totalPrice }, config);
      console.log(data);
      dispatch(orderCreateActions.orderCreateSuccess(data));
      navigate(`/order/${data._id}`);

    } catch (error) {
      console.log(error);
      dispatch(orderCreateActions.orderCreateRequestClose());
    }
  }

  return (
    <>

      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address : </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                "Your cart is empty"
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
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
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
              {loading && <Loader />}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrder;