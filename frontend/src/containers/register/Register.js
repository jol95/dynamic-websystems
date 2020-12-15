import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import "./Register.css";

function Register(props) {
  const email = useFormInput('');
  const password = useFormInput('');
  const firstname = useFormInput('');
  const lastname = useFormInput('');
  const address = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
 
  // handle button click of login form
  const handleLogin = () => {
    const data = {
      'email': email,
      'password': password,
      'firstname': firstname,
      'lastname': lastname, 
      'address': address
    };
  
    console.log(data)
  
    axios.post('/api/user/register', data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
 
  return (
    <div>
      Register<br /><br />
      <div>
        Email<br />
        <input type="text" {...email} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Firstname<br />
        <input type="text" {...firstname} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Lastname<br />
        <input type="text" {...lastname} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Address<br />
        <input type="text" {...address} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Register'} onClick={handleLogin} disabled={loading} /><br />
    </div>
  );
}
 
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
 
export default Register;
