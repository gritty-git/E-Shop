import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { ProductsActions } from "../store/products";
import Paginate from '../components/Paginate'
import { useParams } from "react-router-dom";
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { useNavigate } from 'react-router-dom'

const ProductList = ({ history, match }) => {
    const pageNumber = useParams().pageNumber || 1;
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const productList = useSelector((state) => state.products)
    const { loading, error, data: products, page, pages } = productList
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = useSelector((state) => state.deleteProduct);
    const { userInfo } = useSelector((state) => state.auth)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = useSelector((state) => state.createProduct);

    useEffect(() => {

        //dispatch(listProducts())
        // if (userInfo && userInfo.isAdmin) {

        // } else {
        //   navigate('/login');
        // }
        if (!userInfo || !userInfo.isAdmin) {
            dispatch(ProductsActions.failure("Not authorised as admin!"))
        }
        if (successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`)
        } else {
            listProducts("", pageNumber, dispatch);
        }
    }, [dispatch, userInfo, successDelete, successCreate, createdProduct, pageNumber, error])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            deleteProduct(id, dispatch, userInfo);
        }
    }

    const createProductHandler = () => {
        createProduct(dispatch, userInfo);
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>

                    {!error && <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>}
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>


                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() => deleteHandler(product._id)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate pages={pages} page={page} isAdmin={true} />
                </>
            )}
        </>
    )
}

export default ProductList