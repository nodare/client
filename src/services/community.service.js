import axios from "axios";
import { apiLink, accountId as staticUserId, communities as staticCommunities } from "./../static";


/* 
==============================
            POSTS
==============================
*/

// fetch user's communities
export const fetchUsersCommunities = async userId => {
    return await axios.get(`${apiLink}community/user/${staticUserId}`)
        .then(res=>{
            return res.data
        })
        .catch(err=>{
            console.log(err)
        })
}

// fetch a single community
export const fetchCommunityData = async linearId => { // community linear id
    return await axios.get(`${apiLink}community/${linearId}`)
        .then(res=>{
            return res.data
        })
        .catch(err=>{
            console.log(err)
        })
}

// fetch posts connected to a community
export const fetchCommunityPosts = async linearId => { // community linear id
    return await axios.get(`${apiLink}posts/community/${linearId}`)
        .then(res=>{
            return res.data
        })
        .catch(err=>{
            console.log(err)
        })
}

//fetch post data
export const fetchPostData = async postLinearId => {
    return await axios.get(`${apiLink}posts/${postLinearId}`)
        .then(res=>{
            return res.data
        })
        .catch(err=>{
            console.log(err)
        })
}

// fetch post contents associated with the post
export const fetchPostContents = async postLinearId => {
    return await axios.get(`${apiLink}posts/contents/${postLinearId}`)
    .then(res=>{
        res.data.sort((a,b)=>{
            return a.order - b.order
        })
        return res.data
    })
}

// create new post 
export const createNewPost = async (data) => {
    return await axios.post(`${apiLink}posts`, data)
    .then(res=>{
        return res.data
    })
    .catch(err=>{
        console.log(err)
    })
}

// add contents associated with the post
export const addNewPostContents = async (postLinearId, data) => {
    // data should return an array of contents passed from the post creation page.
    await data.map((content, i)=>{
        content = {
            ...content, 
            ...content.data, 
            data: null, 
            post_id: postLinearId, 
            order: i
        };
        delete content.data;
        axios.post(`${apiLink}posts/contents`, content)
        .then(res=>{
            return res.data
        })
        .catch(err=>{
            console.log(err)
        })
    })

}

/* 
==============================
        POST UPVOTES
==============================
*/

export const verifyUpvote = async (postLinearId, userId) => {
    // await axios.get()
    console.log("verifying upvote")

}


/* 
==============================
        POST COMMENTS
==============================
*/

// fetch post contents associated with the post
export const fetchCommentsByPost = async postLinearId => {
    return await axios.get(`${apiLink}posts/comments/post/${postLinearId}`)
    .then(res=>{
        res.data.sort((a,b)=>{
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        })
        return res.data
    })
    .catch(err=>{
        console.log(err)
    })
}   

// create new post 
export const addCommentbyPostId = async (postLinearId, data) => {
    return await axios.post(`${apiLink}posts/comments/post/${postLinearId}`, data)
    .then(res=>{
        return res.data
    })
    .catch(err=>{
        console.log(err)
    })
}

// create new post 
export const updateComment = async (commentLinearId) => {
    return await axios.put(`${apiLink}posts/comments/${commentLinearId}`)
    .then(res=>{
        return res.data
    })
    .catch(err=>{
        console.log(err)
    })
}
// create new post 
export const deleteComment = async (commentLinearId) => {
    return await axios.delete(`${apiLink}posts/comments/${commentLinearId}`)
    .then(res=>{
        return res
    })
    .catch(err=>{
        console.log(err)
    })
}
