import { useState, useEffect } from "react";
import axios from "axios";

export const useActiveUserDetails = (token) => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    const getUser = () => {
        if(token === null){
            localStorage.removeItem('token')
            setIsLoading(false)
        }else{
            axios.get(`auth/user?token=${token}`, {headers: {"x-access-token": localStorage.getItem("token")}})
            .then(async res=>{
                let data = res.data.user
                let profileImage = await axios.get(`users/images/profile/${data.linear_id}?current=1`) 
                data.current_image = profileImage.data || null
                setResponse(data)
            })
            .catch(err=>{
                setError(err)
            })
            .finally(()=>{
                setIsLoading(false)
            })
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return {response, error, isLoading}
}


export const useUserDetails = (userLinearId) => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    const getUser = (id) => {
        axios.get(`users/${id}`)
        .then((res)=>{
            setResponse(res.data[0])
        })
        .catch(err=>{
            setError(err)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }

    useEffect(()=>{
        getUser(userLinearId)
    }, [])

    return {response, error, isLoading}
}

export const uploadProfileUser = (data) => {
    // const [response, setResponse] = useState(null)
    // const [error, setError] = useState(null)
    // const [isLoading, setIsLoading] = useState(true)

    // useEffect(() => {
    // }, [])
    
    // return {response, error, isLoading}
}