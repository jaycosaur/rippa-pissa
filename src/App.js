import React from 'react';
import Amplify from 'aws-amplify';
import config from "./config";
import Loadable from 'react-loadable'

import './App.css';
import withWindowDimensions from './withWindowDimensions'

// import bits and pieces
import { Layout } from 'antd';

import IntroPage from './containers/IntroPage'

import { connect } from 'react-redux'

import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import store from './store/store'
// sub components
const history = syncHistoryWithStore(browserHistory, store)


Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: "reviews",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
})

const AsyncMobileView = Loadable({
  loader: () => import("./MobileView"),
  loading: "Loading..."
});

const AsyncDesktopView = Loadable({
  loader: () => import("./DesktopView"),
  loading: "Loading..."
});

export default (props) =>
  <Router history={history}>
    <Route path="/" component={IntroPage} />
    <Route path="/main" component={AppViewWithStore}/>
    <Route component={IntroPage} />
  </Router>


const AppView = (props) => {
  switch(props.display.deviceType){
    case "mobile":
      return <AsyncMobileView {...props}/>
    case "tablet":
      return <AsyncMobileView {...props}/>
    case "desktop":
      return <AsyncDesktopView {...props}/>
    default:
      return <AsyncMobileView {...props}/>
  }
}

const AppViewWithStore = connect((store) => {
  return {
    display: store.display
  }
})(withWindowDimensions(AppView))



/*const TabletView = (props) => (
  <Layout className="App">
    <span style={{position: "fixed", left:0, top: 0, zIndex: 1000, color: "red"}}>{props.display.deviceType}</span>
    <Layout style={{minHeight: "100vh"}}>
      <MainContentWithStore />
    </Layout>
  </Layout>
)*/

