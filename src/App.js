import React, { useState, useEffect, createContext } from 'react';
import { Container, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import { createBrowserHistory } from "history";

// redux
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import reducers from "./util/redux";
import MainPage from 'pages/index'
import { useActiveUserDetails } from "util/helpers/hooks/user.hooks";
import {UserContextProvider} from 'pages/user/UserContextProvider'

function App() {
  const user = useActiveUserDetails(localStorage.getItem('token'))
  // redux main store
  const logger = createLogger({
    duration: true,
    timestamp: true, 
    logErrors: true,
    diff: true
  })
  // redux store
  const store = createStore(
    reducers,
    compose(
      applyMiddleware(
        thunk,
        // logger
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )
  
  const uiContext = createContext()

  return (
    
    <Provider store={store}>
      <UserContextProvider value={user.username,user.linear_id}>
        <Router>
          <MainPage/>
        </Router>
      </UserContextProvider>
    </Provider>

  );
}


export default App;