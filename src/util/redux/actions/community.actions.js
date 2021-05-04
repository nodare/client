import axios from 'axios'

/* 
================================
            COMMUNITY
================================
*/


// get community by user's id
// id currently static
export const getAllCommunities = () => async dispatch => {
    let res = await axios.get(`community`)
    return dispatch({
        type: "GET_ALL_COMMUNITIES",
        payload: res.data
    })
}
export const getUsersCommunities = ( userLinearId ) => async dispatch => {
    let res = await axios.get(`community/user/${ userLinearId }`)
    return dispatch({
        type: "GET_USERS_COMMUNITIES",
        payload: res.data
    })
}

export const createCommunity = (data) => async dispatch => {
    let res = await axios.post(`community`, data)
    return dispatch({
        type: 'ADD_COMMUNITY',
        payload: res.data
    })
}

export const clearCommunityItems = () => async dispatch => {
    return dispatch({
        type: "CLEAR_COMMUNITY_ITEMS"
    })
}

export const clearCommunityData = () => async dispatch => {
    return dispatch({
        type: "CLEAR_COMMUNITY_DATA",
    })
}