import React, { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import { Link, useHistory } from "react-router-dom";

import { 
    Form, 
    Container, 
    Button, 
    Row, 
    Col
} from "react-bootstrap";

function LoginPageComponent(props) {
    const history = useHistory()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [tkn, setTokenCookie] = useCookies(['auth'])
    const [isPassed, setIsPassed] = useState(false)
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
        // email: "assistant_manager@weendi.com",
        // password: "asdqwe123"
    })

    const submitLoginForm = () => {
        setLoginForm({
            ...loginForm, 
            email: loginForm.email.trim(),
            password: loginForm.password.trim()
        })
        if(loginForm.email === "" || loginForm.password === "") return window.alert("Please fill out the fields required")
        props.loginUser(loginForm)
    }

    useEffect(() => {
        if(localStorage.getItem('token')){
            history.push('/')
        }
        return () => {
            props.clearToken()
        }
    }, [])

    useEffect(() => {
        if(props.token){
            const date = new Date()
            date.setSeconds(date.getSeconds() + 10)
            setTokenCookie("Auth", props.token, {
                path: '/', 
                expires: date
            })
            setIsLoggedIn(true)
            localStorage.setItem("token", `${props.token}`)
            history.push('/')
        }
    }, [props.token])
    
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
                                    <Form.Label>E-mail Address</Form.Label>
                                    <Form.Control type="text" value={loginForm.email} onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}></Form.Control>
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

            
        </>
    )
}


export { LoginPageComponent }
