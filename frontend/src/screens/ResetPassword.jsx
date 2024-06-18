import React, { useState } from 'react'

import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';

import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { Form, Button, Row, Col, FormGroup } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
const ResetPassword = () => {
  const [email, setEmail] = useState()
  const [otp, setOtp] = useState()
  const [password, setPassword] = useState()
  const[spinner,setPinner]=useState(false)
  const navigate = useNavigate()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  axios.defaults.withCredentials = false;

  const handleSubmit = (e) => {
      e.preventDefault()

     setPinner(true)

      axios.post('http://localhost:5000/generate-otp', {email})
      .then(res => {
          console.log("login: " + res.data);
          if(res.data.Status === "Success")
             {
                handleShow()
              
          }else{
                  setPinner(false)
                 alert("email not registerd")
          }
         }).catch(err => console.log(err))
  }


  //======validate otp=========//
  const handleotp =  (e)=>{
    e.preventDefault()

   axios.post('http://localhost:5000/verify-otp', {otp})
  .then(res => {
      console.log("login: " + res.data);
      if(res.data.Status === "Success") {
          if(res.data.role === "admin") {
              navigate('/dashboard')
          } else {
             //save update Password//
             updatePassword();
          }
      }else if(res.data.Status==="Failed"){
        alert(res.data.message)
      }
  }).catch(err => console.log(err))
}

//End ======validate otp========= End //


//=========Update Password====//
const updatePassword = ()=>{

 
axios.post('http://localhost:5000/updatepassword', {otp,email,password})

.then(res => {
    console.log("login: " + res.data);
    if(res.data.Status === "Success") {
        if(res.data.role === "admin") {
            navigate('/dashboard')
        } else {
          alert("password Updated")
            navigate('/login')
        }
    }else if(res.data.Status === "enterPassword"){
      alert("Please enter password")
    }
}).catch(err => console.log(err))
}

//=========Update Password====//
  
  return (
    <div>
         {spinner && <div>
      <Spinner animation="border" variant="primary"  style={{ width: "200px", height: "200px" }}/>
   
         <strong>...Connecting to Server...</strong> 
      </div>}

   

        <FormContainer> 
        <Form onSubmit={handleSubmit}>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
         Submit-Email
        </Button>
      </Form>
      </FormContainer>



        {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title style={{font:"bold", color:"red"}}>Enter Otp..sent to email..</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <h8 style={{color:"blue"}}>OTP : </h8><input type='text' placeholder='Enter Otp'
          value={otp} onChange={(e)=>setOtp(e.target.value)} 
          style={{marginLeft:'75px',color:"blue"}}/>
          </div>

         <div style={{marginTop:'20px',color:"blue"}}>
         New-Password : <input type='text' placeholder='Enter New Password'
           required
          value={password} onChange={(e)=>setPassword(e.target.value)}
          style={{color:"blue"}}/>
         </div>
        
         

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleotp}>
            Submit Otp
          </Button>
        </Modal.Footer>
      </Modal>


    </div>
  )
}

export default ResetPassword