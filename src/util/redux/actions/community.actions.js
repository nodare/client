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

export const getCommunityData = (communityLinearId) => async dispatch => {
    let res = await axios.get(`community/${communityLinearId}`)
    return dispatch({
        type: "GET_COMMUNITY_DATA",
        payload: res.data[0]
    })
}


export const createCommunity = (data) => async dispatch => {
    let res = await axios.post(`community`, data)
    return dispatch({
        type: 'ADD_COMMUNITY',
        payload: res.data
    })
}

export const updateCommunity = (communityLinearId, data) => async dispatch => {
    let res = await axios.put(`community/${communityLinearId}`, data)
    return dispatch({
        type: 'UPDATE_COMMUNITY',
        payload: res.data
    })
}

export const updateCommunityFiles = (communityLinearId, data) => async dispatch => {
    let res = await axios.put(`community/${communityLinearId}`, data)
    return dispatch({
        type: 'UPDATE_COMMUNITY_FILES',
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