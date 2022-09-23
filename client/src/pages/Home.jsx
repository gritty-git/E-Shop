import Product from "../components/Product";
import { Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './../components/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { ProductsActions } from '../store/products';

export default function Home() {
    const products = useSelector(state => state.products.data);
    const loading = useSelector(state => state.products.loading);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ProductsActions.request());
        axios.get('/api/products/')
            .then(res => {

                dispatch(ProductsActions.success(res.data.products));
            }).catch(err => {
                console.log(err);
            });

    }, []);
    return (
        <>
            <h1>Welcome To E - Shop</h1>
            {loading ? <Loader /> :
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