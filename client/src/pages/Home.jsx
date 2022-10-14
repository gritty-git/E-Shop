import Product from "../components/Product";
import { Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import axios from 'axios';
import Message from '../components/Message'
import Loader from './../components/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { ProductsActions } from '../store/products';


export default function Home() {
    const { data: products, loading, error } = useSelector(state => state.products);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ProductsActions.request());
        axios.get('/api/products/')
            .then(res => {
                dispatch(ProductsActions.success(res.data.products));
            }).catch(error => {
                dispatch(ProductsActions.failure(error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message));
            });

    }, []);
    return (
        <>
            <h1>Welcome To E - Shop</h1>
            {loading ?
                <Loader /> :
                error ?
                    <Message variant='danger'>{error}</Message>
                    :
                    <Row>
                        {products.length === 0 ? <></> : products.map((product) => (
                            <Col sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
            }
        </>
    )
}