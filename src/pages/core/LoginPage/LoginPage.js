import React, { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import { Link, useHistory } from "react-router-dom";
import { Header,Icon,Dimmer,Statistic,Container,Grid,Segment,Button,Form,Divider} from 'semantic-ui-react'
import axios from 'axios';
import { 
    Row, 
    Col
} from "react-bootstrap";

function LoginPageComponent(props) {
    const history = useHistory()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [tkn, setTokenCookie] = useCookies(['auth'])
    const [isPassed, setIsPassed] = useState(false)
    const [isError, setIsError] = useState(false)
    const [errorMessage,setErrorMessage] = useState('')
    const [isLogin,setIsLogin] = useState(false)
    const [signInForm, setSignInForm] = useState({
        input: "",
        password: ""
    })
    const [signUpForm,setSignUpForm] =useState({
        email:"",
        username:"",
        name:"",
    })
    const errorOpen = (sentence) => {
        setIsError(true)
        setErrorMessage(sentence)
    }
    const errorClose = () => {
        setIsError(false)
    }
    const submitSignInForm = () => {
        setSignInForm({
            input: signInForm.input.trim(),
            password: signInForm.password.trim()
        })
        if(signInForm.input == "" || signInForm.password == "") return errorOpen("Please fill out the fields required")
        props.loginUser(signInForm)
    }
    const submitSignUpForm =() => {
        setSignUpForm({
            email:signUpForm.email,
            username:signUpForm.username,
            name:signUpForm.name,
            password:signUpForm.password,
            lang:navigator.languages,
            zone:Intl.DateTimeFormat().resolvedOptions().timeZone,
            isAgreed:signUpForm.isAgreed
        })
        if(signUpForm.email == "" || signUpForm.username =="" || signUpForm.name == "") return errorOpen("Please fill out the fields required")
        if(signUpForm.isAgreed === false) return errorOpen("You haven't agreed to the terms and condtiions applied. ")
        props.registerUser(signUpForm)
    }
    const getGeoInfo = () => {
        axios
          .get("https://ipapi.co/json/")
          .then((response) => {
            let data = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      };
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
        <Container fluid>
        <Statistic.Group>
            <Statistic label='Signups' value='33' color="blue"/>
            <Statistic label='Communities' value='22' color="red"/>
            <Statistic label='Blogs' value='5' color="purple"/>
            <Statistic label='Posts' value='10' color="pink"/>
            <Statistic label='Comments' value='100' color="orange"/>
        </Statistic.Group>
        <Segment placeholder>
            <Grid columns={2} relaxed='very' stackable>
                {isLogin?
                <Grid.Column>
                <Form>
                <Form.Input
                    icon='user'
                    iconPosition='left'
                    label='Username'
                    placeholder='Username'
                    value={signInForm.input}
                    onChange={(e)=>setSignInForm({...signInForm,input:e.target.value})}
                />
                <Form.Input
                    icon='lock'
                    iconPosition='left'
                    label='Password'
                    type='password'
                    value={signInForm.password}
                    onChange={(e)=>setSignInForm({...signInForm,password:e.target.value})}
                />

                <Button content='Login'onClick={()=>submitSignInForm()} primary />
                </Form>
            </Grid.Column>
            :
            <Grid.Column>
                <Form>
                    <Form.Input
                        icon='mail'
                        iconPosition='left'
                        label='Email'
                        placeholder='Email'
                    />
                    <Form.Input
                        icon='user'
                        iconPosition='left'
                        label='Username'
                        placeholder='Username'
                    />
                    <Form.Input
                        icon='info'
                        iconPosition='left'
                        label='Name'
                        placeholder='Name'
                    />
                    <Form.Input
                        icon='lock'
                        iconPosition='left'
                        label='Password'
                        type='password'
                    />
                    <Form.Checkbox
                        label='I agree to the Terms and Conditions'
                    />
                    <Button content='Sign Up' onClick={()=>submitSignUpForm()} primary />
                </Form>
            </Grid.Column>
                }
            
            

            <Grid.Column verticalAlign='middle'>
                {
                    isLogin?
                    <Button content='Sign up' icon='signup' size='big' onClick={()=>setIsLogin(!isLogin)} />
                    :
                    <Button content='Sign in' icon='rocket' size='big' onClick={()=>setIsLogin(!isLogin)}/>
                }
            </Grid.Column>
            </Grid>

            <Divider vertical>Or</Divider>
        </Segment>
        <Dimmer active={isError} onClickOutside={()=>errorClose()} page>
          <Header as='h2' icon inverted>
            <Icon name='warning' />
            {errorMessage}
            <Header.Subheader>-Nodaq-</Header.Subheader>
          </Header>
        </Dimmer>
        </Container>
        </>
    )
}


export { LoginPageComponent }
