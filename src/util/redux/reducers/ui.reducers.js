const uiState = {
    isDarkMode: false,
    isLoading: false,
    hasConnectedToServer: true
}

// reducer
export default function(state=uiState, action){
    switch(action.type){
        case "TOGGLE_LOADING":
            return({
                ...state,
                isLoading: !state.isLoading
            })
        case "TOGGLE_DARK_MODE":
            return({
                ...state,
                isDarkMode: state.isDarkMode
            })
        default:
            return({
                ...state
            })
    }
}
