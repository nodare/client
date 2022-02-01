import React, { useState, useEffect, createContext } from 'react';
import { Container, Button } from "react-bootstrap";
import { createBrowserHistory } from "history";
import RouteComponent from 'routes'


// components
import UserNavbarComponent from 'components/navbars/UserNavbar'
import { useActiveUserDetails } from "util/helpers/hooks/user.hooks";

// context
export const UiContext = React.createContext()

function MainPage(props) {    
    const user = useActiveUserDetails(localStorage.getItem('token'))
    const [currentUser, setCurrentUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [testToggle, setTestToggle] = useState(true)
    
    const history = createBrowserHistory()
    

    useEffect(() => {
            if(user.response){
                setIsLoggedIn(true)
                setCurrentUser(user.response)
            }else{
                console.log(user)
                setIsLoggedIn(false)
                console.log(user.response)
           }
    }, [user])


    return (
            <>
                <UiContext.Provider value={{currentUser, isLoggedIn, setIsLoggedIn}}>
                    {
                        <UserNavbarComponent isLoggedIn={isLoggedIn} user={currentUser || null}/>
                    }
                    
                    <Container className="py-3">                        
                        <RouteComponent currentUser={currentUser}/>
                    </Container>
                </UiContext.Provider>
            </>

    );
}


export default MainPage;


/* 
  NOTES TO REMEMBER: just to avoid confusion
  - communities are called "square"
*/