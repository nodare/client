import React, { useState, useEffect, createContext } from 'react';
import { Container } from "react-bootstrap";
import { Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

// pages
import LoginPage from "pages/core/LoginPage";
import RegisterPage from "pages/core/RegisterPage";
import PageNotFound from "pages/core/PageNotFound";
import HomeFeed from 'pages/core/HomeFeed';

import UserCommunityListPage from 'pages/community/UserCommunityListPage';
import UserCommunityViewPage from "pages/community/UserCommunityViewPage";
import UserCommunitySettingsPage from "pages/community/UserCommunitySettingsPage";
import UserCommunityPostsCreatePage from 'pages/community/posts/UserCommunityPostsCreatePage';
import UserCommunityPostsViewPage from 'pages/community/posts/UserCommunityPostsViewPage';

import PrivacyStatementPage from 'pages/documents/PrivacyStatementPage';
import CookiesPolicyPage from 'pages/documents/CookiesPolicyPage';
import TermsAndConditionsPage from 'pages/documents/TermsAndConditionsPage';
import CommunityGuidelinesPage from 'pages/documents/CommunityGuidelinesPage';
import AdminPage from "pages/admin/AdminPage";
import UserProfilePage from "pages/user/UserProfilePage";
import MessengerPage from 'pages/messenger/MessengerPage';
import MainStorePage from "pages/store/StorePage";
import StoreEmoticonItemPage from "pages/store/StoreEmoticonItemPage";
import StoreMerchandiseItemPage from "pages/store/StoreMerchandiseItemPage";

// components
import UserNavbarComponent from 'components/navbars/UserNavbar'
import SettingsPage from 'pages/user/SettingsPage';
import { useActiveUserDetails } from "util/helpers/hooks/user.hooks";

// context
export const UiContext = React.createContext()

function MainPage(props) {    
    const user = useActiveUserDetails(localStorage.getItem('token') || null)
    const [currentUser, setCurrentUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    const history = createBrowserHistory()
    

    useEffect(() => {
        if(user.isLoading === false){
            if(user.response === null){
                setIsLoggedIn(false)
                setCurrentUser(null)
                history.push('/login')
            }else{
                setIsLoggedIn(true)
                setCurrentUser(user.response)
            }
            setIsLoading(false)
        }else{
            setIsLoading(true)
        }
    }, [user])

    // try placing this on redux if navbar doesn't change
    useEffect(() => {
        setIsLoggedIn(currentUser === null?false:true)
    }, [currentUser])

    return (
            <>
                <UiContext.Provider value={{currentUser, isLoggedIn, setIsLoggedIn}}>

                    {
                        isLoggedIn ?<UserNavbarComponent isLoggedIn={isLoggedIn} user={currentUser || null}/>:""
                    }
                    <Container className="py-3">
                        <Switch>
                            
                            <Route exact path="/noconnection">
                                <div className="text-center h-100">
                                <h1>Whoops! I'm sorry</h1>
                                The server couldn't return data because we are not connected to the database!
                                </div>
                            </Route>

                            <Route exact path="/login">
                                <LoginPage/>
                            </Route>
                            <Route exact path="/register">
                                <RegisterPage/>
                                </Route>
                            <Route exact path="/page-not-found">
                                <PageNotFound/>
                            </Route>

                            {/* home */}
                            <Route exact path="/">
                                <HomeFeed/>
                            </Route>

                            {/* user */}
                            <Route exact path="/me">
                                <UserProfilePage user={currentUser}/>
                            </Route>
                            <Route exact path="/profile/:id">
                                <UserProfilePage/>
                            </Route>
                            <Route exact path="/messenger">
                                <MessengerPage/>
                            </Route>
                            <Route exact path="/settings">
                                <SettingsPage user={currentUser}/>
                            </Route>

                            {/* community */}
                            <Route exact path="/square">
                                <UserCommunityListPage/>
                            </Route>
                            <Route exact path="/square/:community_id">
                                <UserCommunityViewPage/>
                            </Route>
                            <Route exact path="/square/:community_id/settings">
                                <UserCommunitySettingsPage/>
                            </Route>
                            <Route exact path="/square/post/create">
                                <UserCommunityPostsCreatePage/>
                            </Route>
                            <Route exact path="/square/:community_id/post/:post_id">
                                <UserCommunityPostsViewPage/>
                            </Route>

                            {/* document pages */}
                            <Route exact path="/privacy-statement">
                                <PrivacyStatementPage/>
                            </Route>
                            <Route exact path="/cookies-policy">
                                <CookiesPolicyPage/>
                            </Route>
                            <Route exact path="/terms-and-conditions">
                                <TermsAndConditionsPage/>
                            </Route>
                            <Route exact path="/community-guidelines">
                                <CommunityGuidelinesPage/>
                            </Route>

                            {/* store page */}
                            <Route exact path="/store">
                                <MainStorePage/>
                            </Route>
                            <Route exact path="/store/merchandise/:merchandise_id">
                                <StoreMerchandiseItemPage/>
                            </Route>
                            <Route exact path="/store/emoticon/:emoticon_id">
                                <StoreEmoticonItemPage/>
                            </Route>

                            {/* admin page */}
                            <Route exact path="/admin">
                                <AdminPage/>
                                {/* <Redirect to="/admin/dashboard"></Redirect> */}
                            </Route>

                            <Redirect to="/page-not-found"></Redirect>

                        </Switch>

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