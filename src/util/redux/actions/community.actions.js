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

export const removeCommunity = (communityLinearId) => async dispatch => {
    let res = await axios.delete(`community/${communityLinearId}`)
    return dispatch({
        type: 'REMOVE_COMMUNITY',
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

/* 
================================
        COMMUNITY CATEGORIES
================================
*/

export const getCommunityCategories = (communityLinearId) => async dispatch => {
    let res = await axios.get(`community/category/source/${communityLinearId}`)
    return dispatch({
        type: 'GET_COMMUNITY_CATEGORIES',
        payload: res.data
    })
} 

export const getCommunityCategoryData = (categoryLinearId) => async dispatch => {
    let res = await axios.get(`community/category/${categoryLinearId}`)
    return dispatch({
        type: 'GET_COMMUNITY_CATEGORY_DATA',
        payload: res.data
    })
} 

export const createCommunityCategory = (data) => async dispatch => {
    let res = await axios.post(`community/category/add`, data)
    return dispatch({
        type: 'ADD_COMMUNITY_CATEGORY',
        payload: res.data
    })
} 

export const updateCommunityCategory = (categoryLinearId, data) => async dispatch => {
    let res = await axios.put(`community/category/${categoryLinearId}`, data)
    return dispatch({
        type: 'UPDATE_COMMUNITY_CATEGORY',
        payload: res.data
    })
} 

export const removeCommunityCategory = (categoryLinearId, data) => async dispatch => {
    let res = await axios.delete(`community/category/${categoryLinearId}`, data)
    return dispatch({
        type: 'REMOVE_COMMUNITY_CATEGORY',
        payload: res.data
    })
} 

export const clearCategoryItems = () => async dispatch => {
    return dispatch({
        type: "CLEAR_CATEGORY_ITEMS"
    })
}

export const clearCategoryData = () => async dispatch => {
    return dispatch({
        type: "CLEAR_CATEGORY_DATA",
    })
}