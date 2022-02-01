import axios from 'axios'
/* 
================================
            USERS
================================
*/
export const getUserDetails = (userName) => async dispatch => {
    let res = await axios.get(`users/profile/${userName}`)
    return dispatch({
        type: "GET_USER_DETAILS",
        payload: res.data[0]
    })
}
// update profile picture
export const updateProfilePicture = (userLinearId, data) => async dispatch => {
    return dispatch({
        type: "UPDATE_PROFILE_PICTURE",
        payload: null
    })
}
export const getContactList = (userLinearId) => async dispatch=> {
    let res = await axios.get(`users/contacts/${userLinearId}`)
    return dispatch({
        type: "GET_CONTACT_LIST",
        payload: res.data[0]
    })
}
export const getUserName = (userLinearId) => async dispatch=> {
    let res = await axios.get(`users/${userLinearId}`)
    console.log(res)
    return dispatch({
        type:"GET_USERINFO",
        payload:res.data
    })
}