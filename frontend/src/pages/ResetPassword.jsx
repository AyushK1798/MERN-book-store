import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap"; // Import Form, Button, and Alert from react-bootstrap
import { useParams } from "react-router-dom";
import { APIURL } from "./Registration";

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pageAccess, setPageAccess] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    resetPageAccess();
    console.log(resetToken);
  }, []);

  const resetPageAccess = async () => {
    console.log("Called");
    try {
      const response = await axios.get(
        `${APIURL}/validateResetId/${resetToken}`
      );
      setMessage(response.data.message);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage("Invalid Link");
        setPageAccess(false);
      } else {
        setMessage("Error occurred. Please try again later.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate password length
    if (newPassword.length < 6 || confirmPassword.length < 6) {
      setError("Password should be at least 6 characters long.");
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    // Reset the error state if validations pass
    setError("");

    try {
      axios
        .post(`${APIURL}/reset`, {
          resetToken: resetToken,
          newPassword: confirmPassword,
        })
        .then((res) => alert(res.data.message));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {message && <Alert variant="info">{message}</Alert>}
      {pageAccess && (
        <Form onSubmit={handleSubmit} className="w-50">
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group className="mb-3" controlId="newPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default ResetPassword;
