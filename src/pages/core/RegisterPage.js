import React, { useState } from 'react'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { 
    Form, 
    Container, 
    Button, 
    Row, 
    Col
} from "react-bootstrap";

import { registerUser } from "util/redux/actions/auth.actions";

function RegisterPage(props) {
    const [toggleRegister, setToggleRegister] = useState(false)
    const [registerForm, setRegisterForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        contact: "",
        isAgreed: false
    })

    const submitRegistrationForm = () => {
        if( registerForm.password === "" || registerForm.confirmPassword === "" || registerForm.email === "" || registerForm.contactNumber === "") return window.alert("Please fill out all the fields required.")
        if(registerForm.password.trim() !== registerForm.confirmPassword.trim()) return window.alert("Passwords do not match")
        if(registerForm.isAgreed === false) return window.alert("You haven't agreed to the terms and condtiions applied. ")

        let data = {
            email: registerForm.email,
            password: registerForm.password,
            contact: registerForm.contact,
            isAgreed: registerForm.isAgreed
        }
        
        props.registerUser(data)
        .then(()=>{
            console.log(registerForm)
            window.alert("You are now successfully registered!")
            setToggleRegister(true)
        })
    }
    
    return (
        <>
            <Container>
                <h1>Register new account</h1>
                <Form>

                    <Form.Group>
                        <Form.Label>E-mail Address</Form.Label>
                        <Form.Control type="email" value={registerForm.email} required onChange={e=>setRegisterForm({...registerForm, email: e.target.value})}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={registerForm.password} required onChange={e=>setRegisterForm({...registerForm, password: e.target.value})}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" value={registerForm.confirmPassword} required onChange={e=>setRegisterForm({...registerForm, confirmPassword: e.target.value})}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control type="text" value={registerForm.contact} required onChange={e=>setRegisterForm({...registerForm, contact: e.target.value})}></Form.Control>
                    </Form.Group>
                    

                    <Form.Group>
                        <Form.Check type="checkbox" label="I have agreed to the terms and conditions applied" checked={registerForm.isAgreed} onChange={e=>setRegisterForm({...registerForm, isAgreed: !registerForm.termsAndConditions})}></Form.Check>
                    </Form.Group>
                    

                    <Button type="button" onClick={() => submitRegistrationForm()}>Register new account</Button>
                    
                    
                </Form>
            </Container>
            {
                toggleRegister === false?"":(
                    <Redirect push to="/login"></Redirect>
                )
            }
        </>
    )
}


const mapDispatchToProps = {
    registerUser
}

export default connect(null, mapDispatchToProps)(RegisterPage)
