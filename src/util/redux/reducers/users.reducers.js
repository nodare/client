const usersState = {
    users: [],
    userData: [],
}

export default function( state = usersState, action){
    switch(action.type){
        default:
            return({
                ...state
            })
    }
}