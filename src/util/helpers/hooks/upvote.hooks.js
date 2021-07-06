import { useState, useEffect } from "react";
import axios from "axios";

export const useUpvotePost = (postLinearId, userLinearId) => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    const upvotePost = () => {
        let res = await axios.get(`votes/${userId}/posts/${postLinearId}`)
        if(res.data.length === 0){
            let data = {
                user_id: userLinearId,
                post_id: postLinearId,
                status: 0
            }
            let createUpvote = await axios.post(`votes/post`, data)
            if(createUpvote.data){
                res = await axios.get(`votes/${userId}/posts/${postLinearId}`)
            }
        }
    }

    useEffect(() => {
        upvotePost()
    }, [])

    return {response, error, isLoading}
}
