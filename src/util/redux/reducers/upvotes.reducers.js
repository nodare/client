import axios from 'axios';

const upvoteState = {
    posts: [],
    comments: []
}

export default function(state=upvoteState, action){
    switch(action.type){
        case "VERIFY_UPVOTE":
            return ({
                ...state,
                posts: action.payload
            })
        default:
            break;
    }
}
