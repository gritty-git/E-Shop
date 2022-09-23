import Product from "../components/Product";
import { Row, Col } from 'react-bootstrap';

export default function Home({ products }) {

    return (
        <>
            <h1>Welcome To E - Shop</h1>

            <Row>
                {products.length === 0 ? <></> : products.map((product) => (
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}