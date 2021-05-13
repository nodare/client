import axios from 'axios'
import { apiLink, accountId } from "./../../../static";

/* 
================================
            POSTS
================================
*/

// get users community posts
export const getCommunityPosts = communityLinearId => async dispatch => {
    let res = await axios.get(`posts/community/${communityLinearId}`)
    return dispatch({
        type: "GET_COMMUNITY_POSTS",
        payload: res.data
    })
}

// get a single post by post id
export const getPostData = postLinearId => async dispatch => {
    let res = await axios.get(`posts/${postLinearId}`)
    return dispatch({
        type: 'GET_POST_DATA',
        payload: res.data
    })
}

export const addNewPost = data => async dispatch => {
    let res = await axios.post(`posts`, data)
    return dispatch({
        type: "ADD_NEW_POST",
        payload: null
    })
}

export const updatePost = ( postLinearId, data ) => async dispatch => {
    let res = axios.put(`posts/${postLinearId}`, data)
    return dispatch({
        type: "UPDATE_POST",
        payload: null
    })
}

export const removePost = (postLinearId) => async dispatch => {
    let res = axios.delete(`posts/${postLinearId}`)
    return dispatch({
        type: "DELETE_POST",
        payload: res.data
    })
}

export const clearPosts = () => async dispatch => {
    return dispatch({
        type: "CLEAR_POSTS",
        payload: null
    })
}

export const clearPost = () => async dispatch => {
    return dispatch({
        type: "CLEAR_POST",
        payload: null
    })
}


/* 
================================
        POST CONTENTS
================================
*/


export const getPostContents = postLinearId => async dispatch => {
    let res =  await axios.get(`posts/contents/${postLinearId}`)
    return dispatch({
        type: "GET_POST_CONTENTS",
        payload: res.data
    })
}

export const addNewPostContents = (postLinearId, data) => async dispatch => {
    await data.map((content, i)=>{
        content = {
            ...content, 
            ...content.data, 
            data: null, 
            post_id: postLinearId, 
            order: i
        };
        delete content.data;
    })
    let res = await axios.post(`posts/contents`, data)
    return dispatch({
        type: "ADD_NEW_POST_CONTENTS",
        payload: res.data
    })
}

export const removeContentsByPost = postLinearId => async dispatch => {
    let res =  await axios.delete(`posts/contents/source/${postLinearId}`)
    return dispatch({
        type: "DELETE_POST_CONTENTS_BY_POST",
        payload: res.data
    })
}


export const clearContents = () => async dispatch=> {
    return dispatch({
        type: "CLEAR_CONTENTS",
        payload: null
    })
}



/* 
================================
        POST COMMENTS
================================
*/

// get comments connected to a post
export const getCommentsByPost = postLinearId => async dispatch => {
    let res = await axios.get(`posts/${postLinearId}/comments`)
    return dispatch({
        type: "GET_COMMENTS_BY_POST",
        payload: res.data
    })
}

// add a comment to a post
export const addCommentToPost = (data) => async dispatch => {
    let res = await axios.post(`posts/comments`, data)
    return dispatch({
        type: "ADD_COMMENTS_TO_POST",
        payload: res.data
    })
}

// edit a comment
export const updateComment = commentLinearId => async dispatch => {
    let res = await axios.put(`posts/comments/${commentLinearId}`)
    return dispatch({
        type: "UPDATE_COMMENT",
        payload: res.data
    })
}

// delete a comment
export const deleteComment = ( commentLinearId ) => async dispatch => {
    let res = await axios.delete(`${apiLink}posts/comments/${commentLinearId}`)
    return dispatch({
        type: "DELETE_COMMENT",
        payload: res.data
    })
}

export const clearComments = () => async dispatch => {
    return dispatch({
        type: "CLEAR_COMMENTS",
        payload: null
    })
}

export const setPostMessage = message => async dispatch => {
    return dispatch({
        type: "SET_POST_MESSAGE",
        payload: message
    })
}
