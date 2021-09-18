import { useState, useEffect } from 'react'
import axios from 'axios'
import { getPostData } from 'util/redux/actions/posts.actions'

export const useLatestFeed = () => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const getData = (limit = 1) => {
        axios.get(`posts?limit=${5 * limit}`)
        .then((res)=>{
            let temp = res.data
            temp.map((post)=>{
                let community = axios.get(`community/${post?.community_id}`)
                let category = axios.get(`community/category/${post?.category_id}`)
                let user = axios.get(`users/${post?.user_id}`)
                let userImage = axios.get(`users/images/profile/${post?.user_id}`)
                let postContents = axios.get(`posts/contents/${post?.linear_id}`)
                let upvotes = axios.get(`votes/post/${post?.linear_id}`)
                let comments = axios.get(`comments/post/source/${post?.linear_id}`)

                Promise.all([community, category, user, userImage, postContents, upvotes, comments]).then(promiseRes=>{
                    post.community = promiseRes[0].data[0]
                    post.category = promiseRes[1].data[0]
                    post.user = promiseRes[2].data[0]
                    post.user_current_image = promiseRes[3].data[0]
                    post.contents = promiseRes[4].data
                    post.upvotes= promiseRes[5].data
                    post.comments= promiseRes[6].data
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