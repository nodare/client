const usersState = {
    users: [],
    userData: [],
    contacts:[],
    auser:[]
}

export default function( state = usersState, action){
    switch(action.type){
        case "GET_CONTACT_LIST":
            return({
                ...state,
                contacts:action.payload
            })
        case "GET_USERINFO":
            return({
                ...state,
                auser:action.payload
            })
        default:
            return({
                ...state
            })
    }
}