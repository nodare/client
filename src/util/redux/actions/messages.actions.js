import axios from 'axios'

/* 
================================
        CONVERSATIONS
================================
*/

export const searchConversation = (query, limit = null) => async dispatch => {
    let res = await axios.get(`messenger/conversations?q=${query}${limit?`&limit=${limit}`:""}`)
    return dispatch({
        type: "SEARCH_CONVERSATION",
        payload: res.data
    })
}

export const getConversationData = (conversationLinearId, limit = null) => async dispatch => {
    let res = await axios.get(`messenger/conversations/${conversationLinearId}/?${limit?`limit=${limit}`:""}`)
    return dispatch({
        type: "GET_CONVERSATION_DATA",
        payload: res.data
    })
}

export const getUserConversations = (userLinearId, limit = null) => async dispatch => {
    let res = await axios.get(`messenger/conversations/users/${userLinearId}/?${limit?`limit=${limit}`:""}`)
    return dispatch({
        type: "GET_USER_CONVERSATIONS",
        payload: res.data
    })
}

export const addConversation = data => async dispatch => {
    let res = await axios.post(`messenger/conversations`, data)
    // add function to search if there's existing conversation
    return dispatch({
        type: "CREATE_CONVERSATION",
        payload: res.data
    })
}

export const updateConversation = ( conversationLinearId, data )=> async dispatch => {
    let res = await axios.put(`messenger/conversations/${conversationLinearId}`, data)
    return dispatch({
        type: "UPDATE_CONVERSATION",
        payload: res.data
    })
}


/* 
================================
            MESSAGES
================================
*/

export const getMessageData = messageLinearId => async dispatch => {
    let res = await axios.get(`messenger/messages/${messageLinearId}`)
    return dispatch({
        type: "GET_MESSAGE_DATA",
        payload: res.data
    })
}

export const getConversationMessages = conversationLinearId => async dispatch => {
    let res = await axios.get(`messenger/messages/conversation/${conversationLinearId}`)
    return dispatch({
        type: "GET_CONVERSATION_MESSAGES",
        payload: res.data
    })
}

export const addMessage = (data) => async dispatch => {
    let res = await axios.post(`messenger/messages`, data)
    return dispatch({
        type: "ADD_MESSAGE",
        payload: res.data
    })
}

export const updateMessage = messageLinearId => async dispatch => {
    let res = await axios.put(`messenger/messages/${messageLinearId}`)
    return dispatch({
        type: "UPDATE_MESSAGE",
        payload: res.data
    })
}

export const removeMessage = (messageLinearId, data) => async dispatch => {
    data.isDeleted = true
    let res = await axios.put(`messenger/messages/${messageLinearId}`, data)
    return dispatch({
        type: "REMOVE_MESSAGE",
        payload: res.data
    })
}

/* 
================================
            USERS
================================
*/

export const getConversationUsers = (conversationLinearId, limit = null ) => async dispatch => {
    let res = await axios.get(`messenger/users/conversation/${conversationLinearId}${limit?`?limit=${limit}`:""}`)
    return dispatch({
        type: "GET_CONVERSATION_USERS",
        payload: res.data
    })
}

export const addConversationUsers = ( data ) => async dispatch => {
    let res = await axios.post(`messenger/users`, data)
    return dispatch({
        type: "GET_CONVERSATION_USERS",
        payload: res.data
    })
}


/* 
================================
        CLEAR FUNCTIONS
================================
*/


export const clearMessages = () => async dispatch => {
    return dispatch({
        type:"CLEAR_MESSAGES",
        payload: null
    })
}

export const clearMessageData = () => async dispatch => {
    return dispatch({
        type:"CLEAR_MESSAGE_DATA",
        payload: null
    })
}

export const clearConversations = () => async dispatch => {
    return dispatch({
        type:"CLEAR_CONVERSATIONS",
        payload: null
    })
}

export const clearConversationData = () => async dispatch => {
    return dispatch({
        type:"CLEAR_CONVERSATION_DATA",
        payload: null
    })
}

export const clearUsers = () => async dispatch => {
    return dispatch({
        type:"CLEAR_USERS",
        payload: null
    })
}