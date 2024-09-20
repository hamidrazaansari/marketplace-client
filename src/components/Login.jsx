import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Container, Form } from 'react-bootstrap';
import '../assets/css/login.css';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; 
import Swal from 'sweetalert2'


const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://3.110.194.148:5000/login', {
        username,
        password,
      });

      if (response.data.token) {
        // Store token in localStorage instead of sessionStorage
        localStorage.setItem('authToken', response.data.token);

        Swal.fire({
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500
        });

        onLogin(); 
        navigate('/admin'); 
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Invalid username or password.",
        icon: "error"
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      try {
        const decoded = jwtDecode(token);

        // Check if the token has expired
        if (decoded.exp * 1000 > Date.now()) {
          // Token is still valid
          onLogin(); // Update state to reflect the user is logged in
          navigate('/admin'); // Redirect to admin page if the user is still logged in
        } else {
          // Token has expired, remove it
          localStorage.removeItem('authToken');
          Swal.fire({
            title: "Session expired, please log in again.",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });

          navigate('/login');
        }
      } catch (error) {
        // Invalid token, remove it and redirect to login
        localStorage.removeItem('authToken');
        navigate('/login');
      }
    }
  }, [onLogin, navigate]); // Added onLogin and navigate as dependencies

  return (
    <Container>
      <Row className="justify-content-center align-items-center mt-5">
        <Col md={5}>
          <Card className="p-5 card pb-4">
            <Card.Title className="text-center mb-4 title">Login</Card.Title>
            <Card.Body>
              <Form className="d-flex align-items-center justify-content-center flex-column" onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail" className='w-100'>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input px-3 pb-2"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mt-4 w-100">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input px-3 pb-2"
                  />
                </Form.Group>

                <button type="submit" className="w-75 mt-4 btn-hover">
                  Login
                </button>
              </Form>
              <p className="mt-2 text-center">Forgot Password</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
