import axios from 'axios'


export const getUserDetails = userLinearId => async dispatch => {
    return dispatch({
        type: "GET_USER_DETAILS",
        payload: null
    })
}

// update profile picture
export const updateProfilePicture = (userLinearId, data) => async dispatch => {
    return dispatch({
        type: "UPDATE_PROFILE_PICTURE",
        payload: null
    })
}