import { useState, useEffect } from "react";
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
            let postComments = await axios.get(`comments/post/source/${postLinearId}`)
            let postUpvotes = await axios.get(`votes/post/${postLinearId}`)
            let userDetails = await axios.get(`auth/user/${accountId}`)
            data.category = postCategory.data[0]
            data.contents = postContents.data
            data.comments = postComments.data
            data.upvotes = postUpvotes.data
            data.user = userDetails.data[0]
            setResponse(data)
        })
        .catch(err=>{
            setError(err)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    return {response, error, isLoading}

}