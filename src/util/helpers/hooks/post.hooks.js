import { useState, useLayoutEffect } from "react";
import axios from "axios";
import { accountId } from "static";



// try adding useMemo sa hooks para optimal performance
export const usePostData = (postLinearId) => {
    const [isLoading, setIsLoading] = useState(true)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)

    const getData = () =>{
        axios.get(`posts/${postLinearId}`)
        .then(async (res)=>{
            let data = res.data
            let postCategory = await axios.get(`community/category/${data.category_id}`)
            let postContents = await axios.get(`posts/contents/${postLinearId}`)
            let userDetails = await axios.get(`users/${accountId}`)
            let postCommentsCount = await axios.get(`comments/post/count/${postLinearId}`)
            let postUpvotesCount = await axios.get(`votes/post/count/${postLinearId}`)
            data.category = postCategory.data[0]
            data.contents = postContents.data
            data.user = userDetails.data[0]
            console.log(postCommentsCount?.data[0])
            console.log(postUpvotesCount?.data[0])
            data.commentcount = postCommentsCount?.data[0]
            data.upvotecount = postUpvotesCount?.data[0]
            setResponse(data)
        })
        .catch(err=>{
            setError(err)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }

    useLayoutEffect(() => {
        getData()
    }, [])
    return {response, error, isLoading}

}