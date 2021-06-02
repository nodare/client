

const postsState = {
    items: [],
    item: {},
    contents: [],
    comments: [],
    isLoading: false,
    hasError: false,
    message: 'post message'
}

// reducer
export default function(state=postsState, action){
    switch(action.type){
        case "GET_COMMUNITY_POSTS":
            return({
                ...state,
                items: action.payload
            })
        case "GET_COMMUNITY_POSTS_BY_CATEGORY":
            return({
                ...state,
                items: action.payload
            })
        case "GET_POST_DATA":
            return({
                ...state,
                item: action.payload
            })
        case "ADD_NEW_POST":
            return({
                ...state
            })
        case "UPDATE_POST":
            return({
                ...state
            })
        case "DELETE_POST":
            return({
                ...state
            })
        case "CLEAR_POSTS":
            return({
                ...state,
                items: []
            })
        case "CLEAR_POST":
            return({
                ...state,
                item: {}
            })
        case "GET_POST_CONTENTS":
            return({
                ...state,
                contents: action.payload
            })
        case "ADD_NEW_POST_CONTENTS":
            return({
                ...state
            })
        case "DELETE_CONTENTS_BY_POST":
            return({
                ...state
            })
        case "CLEAR_CONTENTS":
            return({
                ...state,
                contents: []
            })
        case "GET_COMMENTS_BY_POST":
            return({
                ...state,
                comments: action.payload
            })
        case "ADD_COMMENTS_TO_POST":
            return({
                ...state
            })
        case "UPDATE_COMMENT":
            return({
                ...state
            })
        case "DELETE_COMMENT":
            return({
                ...state
            })
        case "CLEAR_COMMENTS":
            return({
                ...state,
                comments: []
            })
        case "SET_POST_MESSAGE":
            return({
                ...state,
                message: action.payload
            })
        default:
            return({
                ...state
            })
    }
}
