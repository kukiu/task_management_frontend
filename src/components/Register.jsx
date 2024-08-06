import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Col, Container, Row, Button } from "react-bootstrap";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("https://tws.techmedia.one/api/register/", {
          username,
          email,
          password,
        })
        .then((response) => {
          if (response.data.success) {
            navigate("/login");
          }
        });
    } catch (e) {
      console.error("Failed to register:", e);
      setError("Failed to register");
    }
  };

  return (
    <Container>
      <h1 className="text-white text-center">Welcome to the Tasks</h1>
      <Row className="d-flex justify-content-center">
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
                type="email"
                placeholder="abc@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              Register
            </Button>
            <br />
            <Link to={"/login"}>Already have an account? Login</Link>
          </Form>
          {error && <span style={{ color: "red" }}>{error}</span>}
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
