import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import { 
    Form, 
    Container, 
    Button, 
    Row, 
    Col
} from "react-bootstrap";

function LoginPage() {
    const [isPassed, setIsPassed] = useState(false)
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    })

    const submitLoginForm = () => {
        setLoginForm({
            ...loginForm, 
            username: loginForm.username.trim(),
            password: loginForm.password.trim()
        })
        if(loginForm.username === "" || loginForm.password === "") return window.alert("Please fill out the fields required")
        console.log(loginForm)
        setIsPassed(true)
    }
    
    return (
        <>

            <Container>
                <Row>
                    <Col>
                        test
                    </Col>
                    <Col>
                        <Container className="align-items-center d-flex">
                            <Form className="w-100">
                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" value={loginForm.username} onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}></Form.Control>
                                </Form.Group>
                                <p>Don't have an account? <Link to="/register">Sign up</Link></p>
                                <Button type="button" onClick={() => submitLoginForm()}> Login</Button>
                            </Form>
                        </Container>
                    </Col>
                </Row>
            </Container>

            {
                isPassed === false?"":
                (
                    <Redirect to="/home"></Redirect>
                )
            }
            
        </>
    )
}

export default LoginPage
