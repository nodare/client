import axios from 'axios'

/* 
================================
            COMMENTS
================================
*/

export const getUserDetails = (userLinearId) => async dispatch => {
    let res = await axios.get(`auth/profile/${userLinearId}`)
    return dispatch({
        type: "GET_USER_DETAILS",
        payload: res.data[0]
    })
}

export const clearUserDetails = () => dispatch => {
    return dispatch({
        type: "CLEAR_USER_DETAILS"
    })
}