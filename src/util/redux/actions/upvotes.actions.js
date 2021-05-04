import axios from 'axios'

/* 
================================
            UPVOTES
================================
*/

export const verifyUpvote = (postLinearId, userId) => async dispatch => {
    let res = await axios.get(`votes/${userId}/posts/${postLinearId}`)
    return dispatch({
        type: "VERIFY_UPVOTE",
        payload: res.data
    })
}

// export const togglePostUpvote = () => async dispatch => {
//     let exists = await axios.get()
// }