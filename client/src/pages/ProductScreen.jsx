import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link, useNavigate } from 'react-router-dom';
import Rating from '../components/Rating';
import Message from '../components/Message'
import { Row, Col, ListGroup, Card, Button, Image, Form } from 'react-bootstrap';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { createProductReview } from "../actions/productActions";
import { ProductbyIdActions } from '../store/productById';
import Loader from "../components/Loader";
import { ProductCreateReviewActions } from "../store/productCreateReview";

const ProductScreen = () => {
    const location = useLocation();
    const productId = location.pathname.split("/")[2];

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data: product, loading, error } = useSelector(state => state.productbyId);
    const { userInfo } = useSelector((state) => state.auth);
    const {
        success: successProductReview,
        error: errorProductReview,
    } = useSelector((state) => state.productCreateReview)


    const fetchProduct = async () => {

        try {
            dispatch(ProductbyIdActions.request());
            const { data } = await axios.get(`/api/products/${productId}`);
            console.log(data);
            dispatch(ProductbyIdActions.success(data));
        } catch (error) {

            dispatch(ProductbyIdActions.failure(error.response && error.response.data.message
                ? error.response.data.message
                : error.message));
        }
    }

    useEffect(() => {
        console.log("In", loading);
        if (successProductReview) {

            console.log("here");
            alert('Review Submitted!!')
            setRating(0);
            setComment('')
            dispatch(ProductCreateReviewActions.reset())
        }
        console.log("or there");
        fetchProduct();


    }, [dispatch, successProductReview]);
    const addToCartHandler = () => {
        navigate(`/cart/${productId}?qty=${qty}`);
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            createProductReview(productId, {
                rating,
                comment,
            }, dispatch, userInfo)
        )
    }
    console.log(product, loading);
    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            {(loading || Object.keys(product) == 0) ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : <>
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
                                    text={`${product.numReviews} reviews`}
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
                <Row>
                    <Col md={6}>
                        <h2>Reviews</h2>
                        {product.reviews.length === 0 && <Message>No Reviews</Message>}
                        <ListGroup variant='flush'>
                            {product.reviews.map((review) => (
                                <ListGroup.Item key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating} />
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p>{review.comment}</p>
                                </ListGroup.Item>
                            ))}
                            <ListGroup.Item>
                                <h2>Write a Customer Review</h2>
                                {errorProductReview && (
                                    <Message variant='danger'>{errorProductReview}</Message>
                                )}
                                {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId='rating'>
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control
                                                as='select'
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}
                                            >
                                                <option value=''>Select...</option>
                                                <option value='1'>1 - Poor</option>
                                                <option value='2'>2 - Fair</option>
                                                <option value='3'>3 - Good</option>
                                                <option value='4'>4 - Very Good</option>
                                                <option value='5'>5 - Excellent</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='comment'>
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control
                                                as='textarea'
                                                row='3'
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>
                                        <Button type='submit' variant='primary'>
                                            Submit
                                        </Button>
                                    </Form>
                                ) : (
                                    <Message>
                                        Please <Link to='/login'>sign in</Link> to write a review{' '}
                                    </Message>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </>

            }
        </>
    )
}
export default ProductScreen;