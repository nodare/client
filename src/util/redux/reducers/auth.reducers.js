const authState = {
    users: [],
    userDetails: {},
    token: null,
    refreshTokens: []
}

// reducer
export default function(state=authState, action){
    switch(action.type){
        case "LOGIN_USER":
            return({
                ...state,
                token: action.payload.accessToken,
                userDetails: action.payload
            })
        case "VERIFY_AUTH_USER":
            return({
                ...state,
                userDetails: action.payload
            })
        case "GET_ACTIVE_USER":
            return({
                ...state,
            })
        case "LOGOUT_USER":
            return({
                ...state,
                token: null, 
            })
        case "CLEAR_TOKEN":
            return({
                ...state,
                token: null
            })
        case "CLEAR_USER_DETAILS":
            return({
                ...state,
                userDetails: {}
            })
        default:
            return({
                ...state
            })
    }
}