import { useState, useEffect } from 'react'
import axios from 'axios'
import { getPostData } from 'util/redux/actions/posts.actions'

export const useLatestFeed = () => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const getData = (limit = 1) => {
        axios.get(`posts?limit=${50 * limit}`)
        .then((res)=>{
            let temp = res.data
            temp.map(async (post)=>{
                console.log(post)
                let community = await axios.get(`community/linear/${post?.community_id}`)
                let category = await axios.get(`community/category/${post?.category_id}`)
                let userImage = await axios.get(`users/images/profile/${post?.user_id}`)
                let upvotes = await axios.get(`votes/post/${post?.linear_id}`)
                let comments = await axios.get(`comments/post/source/${post?.linear_id}`)

                Promise.all([community, category, userImage, upvotes, comments]).then(promiseRes=>{
                    post.community = promiseRes[0].data[0]
                    post.category = promiseRes[1].data[0]
                    post.user_current_image = promiseRes[2].data[0]
                    post.upvotes= promiseRes[3].data
                    post.comments= promiseRes[4].data
                })
            })
            setResponse(temp)
            console.log(response)
        })
        .catch(err=>{
            setError(err)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }
    
    useEffect(()=>{
        getData() 
    },[])
    
    
    return {response, error, isLoading}
}