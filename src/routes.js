import React, { useState, useEffect, useContext, createElement } from 'react';
import { Switch, Route } from 'react-router'

// pages
import { LoginPageContainer } from "pages/core/LoginPage";
import { RegisterPageContainer } from "pages/core/RegisterPage";
import { HomePageContainer } from 'pages/core/HomePage';
import PageNotFound from "pages/core/PageNotFound";

import { ListPageContainer } from 'pages/community/ListPage';
import { ViewPageContainer } from "pages/community/ViewPage";
import { SettingsPageContainer } from "pages/community/SettingsPage";
import { ViewPostPageContainer } from 'pages/community/posts/ViewPostPage';
import { CreatePostPageContainer } from 'pages/community/posts/CreatePostPage';
import { UserProfilePageContainer } from "pages/user/UserProfilePage";

import PrivacyStatementPage from 'pages/documents/PrivacyStatementPage';
import CookiesPolicyPage from 'pages/documents/CookiesPolicyPage';
import TermsAndConditionsPage from 'pages/documents/TermsAndConditionsPage';
import CommunityGuidelinesPage from 'pages/documents/CommunityGuidelinesPage';
import AdminPage from "pages/admin/AdminPage";
import { UserSettingsPageContainer } from 'pages/user/SettingsPage'
import MessengerPage from 'pages/messenger/MessengerPage';
import MainStorePage from "pages/store/StorePage";
import StoreEmoticonItemPage from "pages/store/StoreEmoticonItemPage";
import StoreMerchandiseItemPage from "pages/store/StoreMerchandiseItemPage";

import { UiContext } from 'pages'


const routeList = [
    { path: "/login", component: LoginPageContainer , isExact: true},
    { path: "/register", component: RegisterPageContainer , isExact: true},
    { path: "/page-not-found", component: PageNotFound, isExact: true},

    { path: "/", component: HomePageContainer , isExact: true},

    // user
    { path: "/profile/:user_id", component: UserProfilePageContainer, isExact: true},
    { path: "/messenger", component: MessengerPage, isExact: true},
    { path: "/settings", component: UserSettingsPageContainer, isExact: true},
    
    // community pages
    { path: "/square", component: ListPageContainer , isExact: true},
    { path: "/square/:community_id", component:  ViewPageContainer, isExact: true},
    { path: "/square/:community_id/settings", component: SettingsPageContainer, isExact: true},
    { path: "/square/post/create/:community_id", component: CreatePostPageContainer, isExact: true},
    { path: "/square/post/create/:community_id/:category_id", component: CreatePostPageContainer, isExact: true},
    { path: "/square/:community_id/post/:post_id", component: ViewPostPageContainer, isExact: true},
    { path: "/square/:community_id/cat/:category_id", component: ViewPageContainer, isExact: true},

    /* document pages */
    { path: "/privacy-statement", component: PrivacyStatementPage, isExact: true},
    { path: "/cookies-policy", component: CookiesPolicyPage, isExact: true},
    { path: "/terms-and-conditions", component: TermsAndConditionsPage, isExact: true},
    { path: "/community-guidelines", component: CommunityGuidelinesPage, isExact: true},
    
    /* store pages */
    { path: "/store", component: MainStorePage, isExact: true},
    { path: "/store/merchandise/:merchandise_id", component: StoreMerchandiseItemPage, isExact: true},
    { path: "/store/emoticon/:emoticon_id", component: StoreEmoticonItemPage, isExact: true},
    
    /* admin page */
    { path: "/admin", component: AdminPage, isExact: true},
    { path: "/page-not-found", component: PageNotFound, isExact: true}

]

// https://codesandbox.io/s/route-component-react-ts-8z3c1?

export default function RouteComponent(props){
    const [currentUser, setCurrentUser] = useState(null)
    const ui = useContext(UiContext)

    useEffect(() => {
        setCurrentUser(ui.currentUser)
    }, [ui])
    
    return(
        <Switch>
            {
                routeList.map((route, key)=>{
                    return(
                        <Route key={key} path={route.path || null} exact={route.isExact} currentUser={currentUser} redirect={route.redirect || null}>
                            {createElement(route?.component, props )}
                        </Route>
                    )
                })
            }
        </Switch>
    )
}