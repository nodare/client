import { useState, useEffect } from "react";
import axios from "axios";

export const getCommunityDetails = (communityLinearId) => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    const getCommunityData = () => {
        axios.get(`community/${communityLinearId}`)
        .then(res=>{
            setResponse(res.data)
        })
        .catch(err=>{
            setError(err)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getCommunityData()
    }, [])

    return {response, error, isLoading}
}