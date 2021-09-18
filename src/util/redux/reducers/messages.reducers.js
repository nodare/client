const messagesState = {
    conversationData: {},
    conversations: [],
    users: [],
    messages: [],
    message: {},
    dup:false
}

// reducer
export default function(state=messagesState, action){
    switch(action.type){
        case "SEARCH_CONVERSATION":
            return({
                ...state,
                conversations: action.payload
            })
        case "GET_CONVERSATION_DATA":
            return({
                ...state,
                conversationData: action.payload
            })
        case "GET_USER_CONVERSATIONS":
            return({
                ...state,
                conversations: action.payload
            })
        case "DUPLICATION_CHECK":
            return({
                ...state,
                dup: action.payload
            })
        case "CREATE_CONVERSATION":
            return({
                ...state,
                conversationData: action.payload
            })
        case "UPDATE_CONVERSATION":
            return({
                ...state
            })

        case "GET_MESSAGE_DATA":
            return({
                ...state,
                messageData: action.payload
            })
        case "GET_CONVERSATION_MESSAGES":
            return({
                ...state,
                messages: action.payload
            })
        case "ADD_MESSAGE":
            return({
                ...state
            })
        case "UPDATE_MESSAGE":
            return({
                ...state
            })
        case "REMOVE_MESSAGE":
            return({
                ...state
            })
            
        case "GET_CONVERSATION_USERS":
            return({
                ...state,
                users: action.payload
            })
        
        case "CLEAR_MESSAGES":
            return({
                ...state,
                messages: []
            })
        case "CLEAR_MESSAGE_DATA":
            return({
                ...state,
                messageData: []
            })
        case "CLEAR_CONVERSATIONS":
            return({
                ...state,
                conversations: []
            })
        case "CLEAR_CONVERSATION_DATA":
            return({
                ...state,
                conversationData: []
            })
        case "CLEAR_USERS":
            return({
                ...state,
                users: []
            })

        default:
            return({
                ...state
            })
    }
}