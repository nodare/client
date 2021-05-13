const upvoteState = {
    postUpvotes: [],
    postUpvoteItem: {},
    postCommentUpvotes: [],
    isUpvoted: false
}

export default function(state=upvoteState, action){
    switch(action.type){
        case "VERIFY_UPVOTE":
            return ({
                ...state,
                postUpvoteItem: action.payload
            })
        case "TOGGLE_POST_UPVOTE":
            return ({
                ...state
            })
        default:
            return({
                ...state
            })
    }
}
