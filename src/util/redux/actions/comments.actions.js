import axios from 'axios'

/* 
================================
            COMMENTS
================================
*/


// get community comments
export const getCommunityComments = (communityLinearId) => async dispatch => {
    let res = await axios.get(`comments/community/source/${communityLinearId}`)
    return dispatch({
        type: "GET_COMMUNITY_COMMENTS",
        payload: res.data
    })
}

// get post comments
export const getPostComments = (postLinearId) => async dispatch => {
    let res = await axios.get(`comments/post/source/${postLinearId}`)
    return dispatch({
        type: "GET_POST_COMMENTS",
        payload: res.data
    })
}
//delete post comments
export const removePostComments =(postLinearId) => async dispatch =>{
    let res = await axios.delete(`comments/post/source/${postLinearId}`)
    return dispatch({
        type: "REMOVE_POST_COMMENTS",
        payload: res.data
    })
}
// add community comment
export const addCommunityComment = (data) => async dispatch => {
    let res = await axios.post(`comments/community`, data )
    return dispatch({
        type: "ADD_COMMUNITY_COMMENT",
        payload: res.data
    })
}

// add post comment
export const addPostComment = (data) => async dispatch => {
    let res = await axios.post(`comments/post`, data )
    return dispatch({
        type: "ADD_POST_COMMENT",
        payload: res.data
    })
}
export const addPostCommentReply = (data) => async dispatch =>{
    let res = await axios.post(`comments/reply`,data)
    return dispatch({
        type: "ADD_POST_COMMENT_REPLY",
        payload:res.data
    })
}

// update community comment
export const updateCommunityComment = (commentLinearId, data) => async dispatch => {
    let res = await axios.put(`comments/${commentLinearId}/community`, data)
    return dispatch({
        type: "UPDATE_COMMUNITY_COMMENT",
        payload: res.data
    })
}
// update post comment
export const updatePostComment = (commentLinearId, data) => async dispatch => {
    let res = await axios.put(`comments/${commentLinearId}/post`, data)
    return dispatch({
        type: "UPDATE_POST_COMMENT",
        payload: res.data
    })
}

// remove community comment
export const removeCommunityComment = (commentLinearId) => async dispatch => {
    let res = await axios.delete(`comments/${commentLinearId}/community`)
    return dispatch({
        type: "REMOVE_COMMUNITY_COMMENT",
        payload: res.data
    })
}

// remove community comment
export const removePostComment = (commentLinearId) => async dispatch => {
    let res = await axios.delete(`comments/${commentLinearId}/post`)
    return dispatch({
        type: "REMOVE_POST_COMMENT",
        payload: res.data
    })
}

export const clearComments = () => async dispatch => {
    return dispatch({
        type: "CLEAR_COMMENTS",
        payload: null
    })
}
