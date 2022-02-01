import React, { useEffect,useState } from 'react'
import { LinkContainer } from "react-router-bootstrap";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { useUserDetails } from "util/helpers/hooks/user.hooks";
import { Button, Comment, Form, Header,Divider,Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
import { propTypes } from 'react-bootstrap/esm/Image';
function ProfileComponent({userLinearId}){
    const [userName,setUserName] =useState('')
useEffect(()=>{
    axios.get(`/users/${userLinearId}`).then((res)=>{
        console.log(res)
        setUserName(res.data[0].name)
    })
},[userLinearId])
return(
    userName
)
}
export default ProfileComponent
ProfileComponent.propTypes = {
    userLinearId : propTypes.any
}