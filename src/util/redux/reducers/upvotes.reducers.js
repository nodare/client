const upvoteState = {
    postUpvotes: [],
    postUpvoteItem: {},
    postCommentUpvotes: [],
    isUpvoted: false
}

export default function(state = upvoteState, action){
    switch(action.type){
        case "VERIFY_UPVOTE":
            return ({
                ...state,
                postUpvoteItem: action.payload
            })
        case "TOGGLE_POST_UPVOTE":
            return ({
                ...state,
                postUpvotedBoolean: action.payload
            })
        case "POST_UPVOTE_COUNT":
            return({
                ...state,
                postUpvoteCount: action.payload
            })
        case "UPVOTE_COUNT":
            return({
                ...state,
                upvoteCount: action.payload
            })
        default:
            return({
                ...state
            })
    }
}
