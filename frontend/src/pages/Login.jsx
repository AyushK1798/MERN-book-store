import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./registration.css";
import axios from "axios";
import { APIURL } from "./Registration";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${APIURL}/login`, formData)
      .then((res) => {
        if (res.data) {
          localStorage.setItem("accessToken", res.data.accessToken);
          alert(res.data.message);
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <Form className="registration-form my-5" onSubmit={handleSubmit}>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>
      <p><Link to={"/auth/forgot"}>Forgot Password?</Link></p>
    </Form>
  );
};

export default Login;
