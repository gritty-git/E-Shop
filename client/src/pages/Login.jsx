import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { authActions } from '../store/auth';
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, authenticated: isAuthenticated, error } = useSelector((state) => state.auth);
    //const isAuthenticated = useSelector((state) => state.auth.authenticated);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [dispatch, isAuthenticated])

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(authActions.authRequest());
        try {
            const { data } = await axios.post('/api/users/login',
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                },
            )
            dispatch(authActions.signIn(data));
            localStorage.setItem('userInfo', JSON.stringify(data));

        } catch (error) {
            dispatch(authActions.failure(error.response.data.message));
            //setErrorMsg();
        }


        //dispatch(authActions.signIn());

    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}

            <Form onSubmit={submitHandler} className="mt-3">
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button className='mt-5' type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer?{' '}
                    <Link to='/register'>
                        Register
                    </Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default Login;