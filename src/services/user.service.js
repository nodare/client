import axios from "axios";
import { apiLink, accountId as staticUserId, communities as staticCommunities } from "./../static";

export const checkConnection = async () =>{
    await axios.get(`${apiLink}/connection`)
    .then(res=>{
        return res
    })
    .catch(err=>{
        return err
    })
    
}

export const login = (data) => {
    console.log("blank function: user service")
}

export const register = (data) => {
    console.log("blank function: user service")
}

export const validateUser = (data) => {
    console.log("blank function: user service")
}

export const getUserDetails = async (userLinearId) => {
    return await axios.get(`${apiLink}auth/profile/${userLinearId}`)
    .then(res=>{
        return res.data[0]
    })
    .catch(err=>{
        console.log(err)
    })
}