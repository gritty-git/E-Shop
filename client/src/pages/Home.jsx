import Product from "../components/Product";
import { Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import axios from 'axios';
import Message from '../components/Message'
import Loader from './../components/Loader';
import { useSelector, useDispatch } from 'react-redux';

import Paginate from "../components/Paginate";
import { useParams } from "react-router-dom";
import { listProducts } from '../actions/productActions'

export default function Home() {
    //const location = useLocation();
    const keyword = useParams().searchterm;
    const pageNumber = useParams().pageNumber || 1;
    const { data: products, loading, error, page, pages } = useSelector(state => state.products);

    const dispatch = useDispatch();
    useEffect(() => {
        listProducts(keyword, pageNumber, dispatch);
        // dispatch(ProductsActions.request());

        // axios.get(`/api/products?keyword=${keyword ? keyword : ""}`)
        //     .then(res => {

        //         dispatch(ProductsActions.success(res.data));
        //     }).catch(error => {
        //         dispatch(ProductsActions.failure(error.response && error.response.data.message
        //             ? error.response.data.message
        //             : error.message));
        //     });

    }, [dispatch, keyword, pageNumber]);
    return (
        <>
            <h1>Welcome To E - Shop</h1>
            {loading ?
                <Loader /> :
                error ?
                    <Message variant='danger'>{error}</Message>
                    :
                    <>
                        <Row>
                            {products.length === 0 ? <></> : products.map((product) => (
                                <Col sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                        <Paginate
                            pages={pages}
                            page={page}
                            keyword={keyword ? keyword : ''}
                        />
                    </>
            }
        </>
    )
}