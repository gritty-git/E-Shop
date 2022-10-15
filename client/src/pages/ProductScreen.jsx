import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link, useNavigate } from 'react-router-dom';
import Rating from '../components/Rating';
import Message from '../components/Message'
import { Row, Col, ListGroup, Card, Button, Image, Form } from 'react-bootstrap';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { ProductbyIdActions } from '../store/productById';
import Loader from "../components/Loader";

const ProductScreen = () => {
    const [qty, setQty] = useState(1);
    const navigate = useNavigate();
    const { data: product, loading, error } = useSelector(state => state.productbyId);
    //const loading = useSelector(state => state.productbyId.loading);
    const location = useLocation();
    const dispatch = useDispatch();
    const productId = location.pathname.split("/")[2];
    const fetchProduct = async () => {

        try {
            dispatch(ProductbyIdActions.request());
            const { data } = await axios.get(`/api/products/${productId}`);
            dispatch(ProductbyIdActions.success(data));
        } catch (error) {
            dispatch(ProductbyIdActions.failure(error.response && error.response.data.message
                ? error.response.data.message
                : error.message));
        }
    }
    useEffect(() => {
        fetchProduct();
    }, []);
    const addToCartHandler = () => {
        navigate(`/cart/${productId}?qty=${qty}`);
    }

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) :
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating
                                    value={product.rating}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <Form.Control
                                                    as='select'
                                                    value={qty}
                                                    onChange={(e) => setQty(e.target.value)}
                                                >
                                                    {[...Array(product.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    <Button
                                        onClick={addToCartHandler}
                                        className='btn-block'
                                        type='button'
                                        disabled={product.countInStock === 0}
                                    >
                                        Add To Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            }
        </>
    )
}
export default ProductScreen;