import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import FormContainer from "../components/FormContainer";

// React-bootstrap Styles
import { Form, Button, Col, Row } from "react-bootstrap";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Row className="justify-content-md-center mt-3">
        <Col xs={12} md={4}>
          <h3 className="text-center">Login Account</h3>
          <Form className="mt-3" onSubmit={onSubmit}>
            <Form.Control type="email" className="mb-3" name="email" id="email" value={email} onChange={onChange} placeholder="Enter your email" required />
            <Form.Control type="password" className="mb-3" name="password" id="password" value={password} onChange={onChange} placeholder="Enter password" required />
            <div className="d-grid gap-2">
              <Button type="submit" variant="dark">
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Login;
