import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import "./Login.css";

class Login extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      email:"",
      password:"",
      newEmail:"",
      newPassword:""
    }
  }

  validateForm = (e) => {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: this.state.password,
      password: this.state.password
    };

    console.log(user);
    router.get('/api/user',((request, response) => {
      console.log("User details");
      console.log("Data before sending is ")
      console.log(user);
      axios.get('http://localhost:8082/api/user')
      .then((getResponse) => {
        console.log("GET Response")
        console.log(getResponse.user);
        data = getResponse.user;
        response.send(user);
      })
      .catch(function (error) {
        console.log("Error while fetching user data");
      });  
    }))
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
              onChange={(e, newValue) => this.setState({password: newValue})}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e, newValue) => this.setState({password: newValue})}
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


