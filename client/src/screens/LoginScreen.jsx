import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { toast } from 'react-toastify';
import { useBoundStore } from '../store/index';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = useBoundStore((store) => store.login);
  const isLoadingUserInfo = useBoundStore((store) => store.isLoadingUserInfo);
  const userInfo = useBoundStore((store) => store.userInfo);

  const navigate = useNavigate();
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);

  const redirect = searchParams.get('redirect') || '/';

  if (userInfo) {
    navigate(redirect);
  }

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      await login({ email, password });
      navigate(redirect);
    } catch (err) {
      console.log(err, 'login error');
      toast.error(err?.response?.data.message);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button disabled={isLoadingUserInfo} type='submit' variant='primary'>
          Sign In
        </Button>

        {isLoadingUserInfo && <Loader />}
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
