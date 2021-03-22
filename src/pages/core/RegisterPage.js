import React, { useState } from 'react'
import { Redirect } from "react-router-dom";
import { 
    Form, 
    Container, 
    Button, 
    Row, 
    Col
} from "react-bootstrap";

function RegisterPage() {
    const [toggleRegister, setToggleRegister] = useState(false)
    const [registerForm, setRegisterForm] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        contactNumber: "",
        termsAndConditions: false
    })

    const submitRegistrationForm = () => {
        if(registerForm.username === "" || registerForm.password === "" || registerForm.confirmPassword === "" || registerForm.email === "" || registerForm.contactNumber === "") return window.alert("Please fill out all the fields required.")
        if(registerForm.password.trim() !== registerForm.confirmPassword.trim()) return window.alert("Passwords do not match")
        if(registerForm.termsAndConditions === false) return window.alert("You haven't agreed to the terms and condtiions applied. ")
        console.log(registerForm)
        window.alert("You are now successfully registered!")
        setToggleRegister(true)
    }
    
    return (
        <>
            <Container>
                <h1>Register new account</h1>
                <Form>

                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" value={registerForm.username} onChange={e=>setRegisterForm({...registerForm, username: e.target.value})}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={registerForm.password} onChange={e=>setRegisterForm({...registerForm, password: e.target.value})}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" value={registerForm.confirmPassword} onChange={e=>setRegisterForm({...registerForm, confirmPassword: e.target.value})}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>E-mail Address</Form.Label>
                        <Form.Control type="email" value={registerForm.email} onChange={e=>setRegisterForm({...registerForm, email: e.target.value})}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control type="text" value={registerForm.contactNumber} onChange={e=>setRegisterForm({...registerForm, contactNumber: e.target.value})}></Form.Control>
                    </Form.Group>
                    

                    <Form.Group>
                        <Form.Check type="checkbox" label="I have agreed to the terms and conditions applied" checked={registerForm.termsAndConditions} onChange={e=>setRegisterForm({...registerForm, termsAndConditions: !registerForm.termsAndConditions})}></Form.Check>
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

export default RegisterPage
