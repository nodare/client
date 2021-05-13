import React, { useState } from 'react';
import { Alert, Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link, Redirect  } from "react-router-dom";

// redux
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducers from "./util/redux";



// pages
import LoginPage from "./pages/core/LoginPage";
import RegisterPage from "./pages/core/RegisterPage";
import PageNotFound from "./pages/core/PageNotFound";
import HomeFeed from './pages/core/HomeFeed';

import UserCommunityListPage from './pages/community/UserCommunityListPage';
import UserCommunityViewPage from "./pages/community/UserCommunityViewPage";
import UserCommunitySettingsPage from "./pages/community/UserCommunitySettingsPage";
import UserCommunityPostsCreatePage from './pages/community/posts/UserCommunityPostsCreatePage';
import UserCommunityPostsViewPage from './pages/community/posts/UserCommunityPostsViewPage';

import PrivacyStatementPage from './pages/documents/PrivacyStatementPage';
import CookiesPolicyPage from './pages/documents/CookiesPolicyPage';
import TermsAndConditionsPage from './pages/documents/TermsAndConditionsPage';
import CommunityGuidelinesPage from './pages/documents/CommunityGuidelinesPage';
import AdminPage from "./pages/admin/AdminPage";
import UserProfilePage from "./pages/user/UserProfilePage";
import MessengerPage from './pages/messenger/MessengerPage';
import MainStorePage from "./pages/store/StorePage";
import StoreEmoticonItemPage from "./pages/store/StoreEmoticonItemPage";
import StoreMerchandiseItemPage from "./pages/store/StoreMerchandiseItemPage";


// components
import UserNavbarComponent from './components/navbars/UserNavbar'
import SettingsPage from './pages/user/SettingsPage';

function App() {
  // redux main store
  
  const store = createStore(
    reducers,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )

  
  const [isLoggedIn, IsLoggedIn] = useState(true)
  const [isConnected, setIsConnected] = useState(true)
  
  return (
    
    <Provider store={store}>
      <Router>

        {
          isConnected?<UserNavbarComponent isLoggedIn={isLoggedIn}/>:""
        }

        <Container className="py-3">

            <Switch>
              {/* root */}
              <Route exact path="/">
                {
                  isLoggedIn?
                    <Redirect to="/home"></Redirect>
                  :
                    <Redirect to="/login"></Redirect>
                }
              </Route>

              <Route exact path="/noconnection">
                {isConnected?<Redirect to="/home"></Redirect>:""}
                <div className="text-center h-100">
                  <h1>Whoops! I'm sorry</h1>
                  The server couldn't return data because we are not connected to the database!
                </div>
              </Route>
              
              {
                !isConnected?<Redirect to="/noconnection"></Redirect>:""
              }

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
              <Route exact path="/home">
                <HomeFeed/>
              </Route>

              {/* user */}
              <Route exact path="/me">
                <UserProfilePage/>
              </Route>
              <Route exact path="/profile/:id">
                <UserProfilePage/>
              </Route>
              <Route exact path="/messenger">
                <MessengerPage/>
              </Route>
              <Route exact path="/settings">
                <SettingsPage/>
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

            {/* <UserCommunityViewPage/> */}
            {/* <UserCommunityListPage/> */}
        </Container>
        
      </Router>
      

    </Provider>

  );
}


export default App;


/* 
  NOTES TO REMEMBER: just to avoid confusion
  - communities are called "square"
*/