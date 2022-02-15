import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

import { Row, Col, Form, Button } from "react-bootstrap";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate("/dashboard");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Row className="justify-content-md-center mt-3">
        <Col xs={12} md={4}>
          <h3 className="text-center">Create Account</h3>
          <Form onSubmit={onSubmit} className="mt-3">
            <Form.Control type="name" name="name" id="name" value={name} className="mb-3" onChange={onChange} placeholder="Enter your name" required />
            <Form.Control type="email" name="email" id="email" value={email} className="mb-3" onChange={onChange} placeholder="Enter your email" required />
            <Form.Control type="password" name="password" id="password" value={password} className="mb-3" onChange={onChange} placeholder="Enter password" required />
            <Form.Control type="password" name="password2" id="password2" value={password2} className="mb-3" onChange={onChange} placeholder="Confirm Password" required />
            <div className="d-grid gap-2">
              <Button type="submit" variant="dark">
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Register;
