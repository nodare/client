import React, { useState } from 'react';
import { Alert, Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link, Redirect  } from "react-router-dom";

// pages
import LoginPage from "./pages/core/LoginPage";
import RegisterPage from "./pages/core/RegisterPage";
import PageNotFound from "./pages/core/PageNotFound";

import UserCommunityListPage from './pages/community/UserCommunityListPage';
import UserCommunityPostsCreatePage from './pages/community/posts/UserCommunityPostsCreatePage';
import UserCommunityPostsViewPage from './pages/community/posts/UserCommunityPostsViewPage';
import PrivacyStatementPage from './pages/documents/PrivacyStatementPage';
import CookiesPolicyPage from './pages/documents/CookiesPolicyPage';
import TermsAndConditionsPage from './pages/documents/TermsAndConditionsPage';
import CommunityGuidelinesPage from './pages/documents/CommunityGuidelinesPage';
import AdminPage from "./pages/admin/AdminPage";
import UserProfilePage from "./pages/user/UserProfilePage";
import MainStorePage from "./pages/store/StorePage";


// components
import UserNavbarComponent from './components/navbars/UserNavbar'


function App() {
  
  
  return (
    
    <>
      <Router>
        <UserNavbarComponent/>
        <Container>

          <div className="py-3">
            <Switch>
              <Route exact path="/login">
                <LoginPage/>
              </Route>
              <Route exact path="/register">
                <RegisterPage/>
                </Route>
              <Route path="/page-not-found">
                <PageNotFound/>
              </Route>

              {/* home */}
              <Route exact path="/">
                This is the homepage
              </Route>

              {/* user */}
              <Route exact path="/me">
                <UserProfilePage/>
              </Route>
              <Route exact path="/profile/:id">
                <UserProfilePage/>
              </Route>

              {/* community */}
              <Route exact path="/community">
                <UserCommunityListPage/>
              </Route>
              <Route exact path="/community">
                <UserCommunityListPage/>
              </Route>
              <Route exact path="/community/post/create">
                <UserCommunityPostsCreatePage/>
              </Route>
              <Route exact path="/community/post/:community_id">
                <UserCommunityPostsViewPage/>
              </Route>
              <Route exact path="/community/:community_id/post/:id">
                <UserCommunityPostsCreatePage/>
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

              {/* admin page */}
              <Route exact path="/admin">
                <AdminPage/>
                {/* <Redirect to="/admin/dashboard"></Redirect> */}
              </Route>

            </Switch>

            {/* <UserCommunityViewPage/> */}
            {/* <UserCommunityListPage/> */}
          </div>
        </Container>
        
      </Router>
      

    </>

  );
}


export default App;
