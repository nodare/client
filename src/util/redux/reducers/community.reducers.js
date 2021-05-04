const communityState = {
    items: [],
    item: {},
    queries: [],
    isLoading: false,
    hasError: false,
    message: "community message"
}

// bale dito pangkuha at inaassign sa mga values
export default function(state=communityState, action) {
    switch(action.type){
        case "GET_ALL_COMMUNITIES":
            return{
                ...state, 
                message: "Successfully fetched all communitites",
                items: action.payload
            }
        case "GET_USERS_COMMUNITIES":
            return{
                ...state, 
                message: "Successfully fetched user's communitites",
                items: action.payload
            }
        case "GET_COMMUNITY_DATA":
            return{
                ...state, 
                message: "Successfully fetched community data",
                item: action.payload
            }
        case "ADD_COMMUNITY":
            return{
                ...state
            }
        case "CLEAR_COMMUNITY_ITEMS":
            return{
                ...state, 
                message: "Cleared user's communitites",
                items: []
            }
        case "CLEAR_COMMUNITY_DATA":
            return{
                ...state, 
                message: "Clear community data",
                item: {}
            }
        default:
            return state;
    }
}

