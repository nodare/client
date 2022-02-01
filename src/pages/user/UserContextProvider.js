import React, { createContext, useState, useEffect, useContext } from 'react'
import { useActiveUserDetails } from './hooks'

const initialState = {
    currentUser: null,
    isVerified: null
}

export const UserContext = createContext(initialState)
export const useUserContext = () => useContext(UserContext)

export const UserContextProvider = ({children, value}) => {
    //const [testState, setTestState] = useState("asdf")
    
    return(
        <UserContext.Provider values={{UserContext}}>
            {children}
        </UserContext.Provider>
    )
}