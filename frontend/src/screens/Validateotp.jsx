import React, { useState } from 'react'

import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { Form, Button, Row, Col, FormGroup } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

const Validateotp = () => {

    const [otp,setOtp] =useState();
    const navigate = useNavigate()
    const handleSubmit = (e)=>{
        e.preventDefault()
       
        axios.post('http://localhost:5000/verify-otp', {otp})
      .then(res => {
          console.log("login: " + res.data);
          if(res.data.Status === "Success") {
              if(res.data.role === "admin") {
                  navigate('/dashboard')
              } else {
                  navigate('/update')
              }
          }
      }).catch(err => console.log(err))
    }
  return (
    <div>
 <FormContainer>
    <Form onSubmit={handleSubmit}>
    <Form.Group className='my-2' controlId='email'>
          <Form.Label>Validate OTP</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter OTP'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
         Submit-OTP
        </Button>
    </Form>
 </FormContainer>
        
    </div>
  )
}

export default Validateotp