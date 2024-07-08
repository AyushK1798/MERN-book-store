import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { APIURL } from "./Registration";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${APIURL}/forgot`, { email }).then((res)=> alert(res.data.message));
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={email}
          onChange={handleChange}
          isInvalid={!!errors}
        />
        <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default ForgotPassword;
