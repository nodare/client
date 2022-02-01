import { useState, useEffect } from "react";
import axios from "axios";

export const useCommunityDetails = (addr) => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    const getCommunityData = () => {
        axios.get(`community/${addr}`)
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


export const useFollowedCommunities = (userLinearId) => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    const getCommunityData = () => {
        axios.get(`community/user/${userLinearId}/follow`)
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