const authState = {
    users: [],
    userDetails: {}
}

// reducer
export default function(state=authState, action){
    switch(action.type){
        case "GET_USER_DETALS":
            return({
                ...state,
                userDetails: action.payload
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