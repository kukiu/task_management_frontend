import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Form } from "react-bootstrap";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/");
    } catch (error) {
      console.error("Failed to login:", error);
      setError("Failed to login");
    }
  };

  return (
    <Container>
        <h1 className="text-white text-center">Welcome to the Tasks</h1>
      <Row className="d-flex justify-content-center align-items-center">
        <Col sm={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
              <br />
              <Link to={'/register'}>Don't have an account? Register</Link>
            </Form>
            {error && <span style={{ color: "red" }}>{error}</span>}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
