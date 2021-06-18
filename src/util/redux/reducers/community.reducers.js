const communityState = {
    items: [],
    item: {},
    categoryItems: [],
    categoryItem: {},
    queries: [],
    isLoading: false,
    followers: null,
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
        case "UPDATE_COMMUNITY":
            return{
                ...state
            }
        case "REMOVE_COMMUNITY":
            return{
                ...state
            }
        case "UPDATE_COMMUNITY_FILES":
            return{
                ...state
            }

        // community fullow reducers
        case "GET_COMMUNITY_FOLLOWERS":
            return{
                ...state,
                followers: action.payload
            }
        case "FOLLOW_COMMUNITY":
            return{
                ...state,
            }
        case "CLEAR_FOLLOW_COMMUNITY":
            return{
                ...state, 
                followers: null
            }


        case "GET_COMMUNITY_CATEGORIES":
            return{
                ...state,
                categoryItems: action.payload
            }
        case "GET_COMMUNITY_CATEGORY_DATA":
            return{
                ...state,
                categoryItem: action.payload
            }
        case "ADD_COMMUNITY_CATEGORY":
            return{
                ...state
            }
        case "UPDATE_COMMUNITY_CATEGORY":
            return{
                ...state
            }
        case "REMOVE_COMMUNITY_CATEGORY":
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
        case "CLEAR_CATEGORY_ITEMS":
            return{
                ...state, 
                message: "Cleared user's categories",
                categoryItems: []
            }
        case "CLEAR_CATEGORY_DATA":
            return{
                ...state, 
                message: "Clear category data",
                categoryItem: {}
            }
        default:
            return state;
    }
}

