import axios from 'axios'

/* 
================================
            UPVOTES
================================
*/

export const verifyPostUpvote = (postLinearId, userId) => async dispatch => {
    let exists = false
    let res = await axios.get(`votes/${userId}/posts/${postLinearId}`)
    if(res.data.length === 0){
        let data = {
            user_id: userId,
            post_id: postLinearId,
            status: 0
        }
        let createUpvote = await axios.post(`votes/post`, data)
        if(createUpvote.data){
            exists = true
            res = await axios.get(`votes/${userId}/posts/${postLinearId}`)
        }
    }
    return dispatch({
        type: "VERIFY_UPVOTE",
        payload: res.data[0]
    })
}

export const togglePostUpvote = (voteLinearId, data) => async dispatch => {
    let res = await axios.put(`votes/${voteLinearId}/post`, data)
    return dispatch({
        type: "TOGGLE_UPVOTE",
        payload: res.data
    })
}

// export const togglePostUpvote = () => async dispatch => {
//     let exists = await axios.get()
// }