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
    return email.length > 0 && password.length > 0;
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
              value={email}
              onChange={(e) => this.setState({email: e.target.value})}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => this.setState({email: e.target.value})}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!this.validateForm()}>
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login


