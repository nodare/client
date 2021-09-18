import { ActionTypes } from "redux-devtools-instrument"

/* 
    NOTES: if comments have replies, it should be put inside every comment
*/
const commentsState = {
    items: [],
    item: {},
    isLoading: false,
    hasError: false,
    message: "comments message"
}

// bale dito pangkuha at inaassign sa mga values
export default function(state=commentsState, action) {
    switch(action.type){
        case "GET_COMMUNITY_COMMENTS":
            return{
                ...state, 
                message: "Successfully fetched all comment",
                items: action.payload
            }
        case "GET_POST_COMMENTS":
            return{
                ...state, 
                message: "Successfully fetched all comment",
                items: action.payload
            }
        case "ADD_COMMUNITY_COMMENT":
            return{
                ...state, 
                message: "Successfully added comment data",
            }
        case "ADD_POST_COMMENT":
            return{
                ...state, 
                message: "Successfully added comment data",
            }
        case "UPDATE_COMMUNITY_COMMENT":
            return{
                ...state, 
                message: "Successfully updated comment data",
            }
        case "UPDATE_POST_COMMENT":
            return{
                ...state, 
                message: "Successfully updated comment data",
            }
        case "DELETE_COMMUNITY_COMMENT":
            return{
                ...state, 
                message: "Successfully removed comment data",
            }
        case "DELETE_POST_COMMENT":
            return{
                ...state, 
                message: "Successfully removed comment data",
            }
        case "REMOVE_POST_COMMENTS":
            return{
                ...state,
                message: "Successfully removed all comments for this post"
            }
        case "CLEAR_COMMENTS":
            return{
                ...state, 
                message: "Cleared user's comment",
                items: []
            }
        case "CLEAR_COMMENT_DATA":
            return{
                ...state, 
                message: "Clear comment data",
                item: {}
            }
        default:
            return state;
    }
}

