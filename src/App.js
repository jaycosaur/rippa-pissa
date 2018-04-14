import React from 'react';
import './App.css';

// import firebase connection object
//import { BASE } from './base'

// import bits and pieces
import { Layout } from 'antd';

import IconContainer from './components/IconContainer'
import SideBar from './components/SideBar'
import MapContainer from './containers/MapContainer'

import { connect } from 'react-redux'

// sub components
const { Content } = Layout;

export default (props) => (
        <Layout className="App">
          <Layout style={{minHeight: "100vh"}}>
            <SideBar />
            <MainContentWithStore />
          </Layout>
        </Layout>
    )

const MainContent = (props) => (
  <Content style={{width: "100%", marginLeft: props.display.showSideBar?400:0}}>
    <IconContainer />
    <MapContainer/>
  </Content>
)

const MainContentWithStore = connect((store) => {
  return {
    display: store.display
  }
})(MainContent)