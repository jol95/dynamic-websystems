import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";

class Login extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      email:"",
      password:"",
    }
  }

  validateForm = (e) => {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render(){
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              onChange={(e, newValue) => this.setState({email: newValue})}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e, newValue) => this.setState({email: newValue})}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!this.validateForm}>
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login


