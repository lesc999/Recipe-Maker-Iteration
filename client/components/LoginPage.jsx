import React from 'react'
// import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';


export default function LoginPage() {



  function postLogin(user, pw) {
    console.log('hit postLogin')
     axios.post('./api/login', {username: user, password: pw})
     .then(res => {
       console.log(res)
      window.location.href = res.request.responseURL;
     })
  }

  const handleSubmit = (e) => {
    console.log('hit handleSubmit')
    e.preventDefault();
    console.log(e.target)
    console.log('user',e.target[0].value)
    console.log('pw',e.target[1].value)
    // console.log(e.target[1][1].value)
    postLogin(e.target[0].value, e.target[1].value)

  };


  return (
    <div id='formDiv'>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button  variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}
