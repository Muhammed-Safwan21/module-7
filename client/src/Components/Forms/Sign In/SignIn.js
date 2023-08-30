import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useFormSignIn, InputField } from "../FormUtils";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function SignIn() {
  const { values, handleInput} = useFormSignIn();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const submitForm = async (event) => {
    event.preventDefault();
    
      try {
          await axios.post(
          "http://localhost:4000/api/user/login",   
          {
            email: values.email,
            password: values.password,
          },
          {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true 
          },
        );
        
        navigate('/');
      }  catch (error) {
        if (error.response && error.response.status === 401) {
          setLoginError("Incorrect email or password."); // Set the login error message
        } else {
          console.error("Error logging data:", error);
        }
      }
  }
  

  return (
    <>
    <Form className="form-container1" onSubmit={submitForm}>
      <h3 className="main-title">SIGN IN</h3>
      {loginError && <div className="error-message">{loginError}</div>}
      

      <InputField
        controlId="floatingEmail"
        label="Email address"
        type="email"
        name="email"
        placeholder="Email Address"
        required
        value={values.email}
        onChange={handleInput}
      />

      <InputField
        controlId="floatingPassword"
        label="Password"
        type="password"
        name="password"
        placeholder="Password"
        required
        value={values.password}
        onChange={handleInput}
      />
      <Button type="submit" variant="info" className="signIn-button">
          SIGN IN
      </Button>
      <div className="links-container">
      <Link to="/forgot-password" className="forgot-password-link">
          Forgot Password?
        </Link>
        <Link to="/register" className="forgot-password-link">
          Sign Up
        </Link>
      </div>
      </Form>
      </>
    
  );
}

export default SignIn;
