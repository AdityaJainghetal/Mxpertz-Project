



import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../config';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DoctorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const api = `${BASE_URL}/doctor/doctorlogin`;

    try {
      const response = await axios.post(api, { email, password });

      localStorage.setItem('name', response.data.name);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('docid', response.data._id);

      toast.success('You have successfully logged in!');
      setTimeout(() => navigate('/doctordashboard'), 1000);
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Login failed. Please try again.');
    }
  };

  return (
    <>
      <Container fluid className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <Row className="w-100 justify-content-center">
          <Col xs={11} sm={8} md={6} lg={4}>
            <Card className="shadow-lg p-4">
              <Card.Body>
                <h2 className="text-center mb-4">Doctor Login</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    Login
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default DoctorLogin;
