import axios from 'axios'

/* 
================================
            COMMENTS
================================
*/

export const loginUser = (data) => async dispatch => {
    let res = await axios.post(`auth/login`, data)
    return dispatch({
        type: "LOGIN_USER",
        payload: res.data
    })
} 

export const testIsAuth = () => async dispatch => {
    let res = await axios.get(`auth/isUserAuth`, {headers: {"x-access-token": localStorage.getItem("token")}})
    return dispatch({
        type: "VERIFY_AUTH_USER",
        payload: res.data
    })
} 

export const registerUser = (data) => async dispatch => {
    let res = await axios.post(`auth/register`, data)
    return dispatch({
        type: "REGISTER_USER",
        payload: res.data
    })
} 

export const getUserDetails = (userLinearId) => async dispatch => {
    let res = await axios.get(`auth/profile/${userLinearId}`)
    return dispatch({
        type: "GET_USER_DETAILS",
        payload: res.data[0]
    })
}

export const logoutUser = () => async dispatch => {
    console.log("logging out")
    return dispatch({
        type: "LOGOUT_USER",
        payload: null
    })
}

export const clearUserDetails = () => dispatch => {
    return dispatch({
        type: "CLEAR_USER_DETAILS"
    })
}

export const clearToken = () => dispatch => {
    return dispatch({
        type: "CLEAR_TOKEN",
        token: null
    })
}