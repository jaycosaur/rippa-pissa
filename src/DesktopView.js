import React from 'react'


// import bits and pieces
import { Layout } from 'antd';

import IconContainer from './components/IconContainer'

import SideBar from './components/SideBar'
import MapContainer from './containers/MapContainer'

import RippaPissaLogo from './components/RippaPissaLogo'

import { connect } from 'react-redux'
// sub components
const { Content } = Layout;
const showDevice = false

export default (props) => <Layout className="App">
    {showDevice&&<span style={{position: "fixed", left:0, top: 0, zIndex: 1000, color: "red"}}>{props.display.deviceType}</span>}
    <Layout style={{minHeight: "100vh"}}>
    <SideBar />
    <MainContentWithStore />
    <RippaPissaLogo height="60px" style={{margin: "1em", position: "fixed", right: 0, top: 0}}/>
    </Layout>
</Layout>

const MainContent = (props) => (
    <Content style={{width: "100%", marginLeft: props.display.showSideBar?400:0}}>
      <IconContainer />
      <MapContainer/>
    </Content>
  )
  
  const MainContentWithStore = connect((store) => {
    return {
      display: store.display,
      location: store.location
    }
  })(MainContent)