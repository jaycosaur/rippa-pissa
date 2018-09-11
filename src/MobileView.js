import React from 'react'
import ReactDOM from 'react-dom'

// import bits and pieces
import { Layout } from 'antd';

import MobileMapIconContainer from './components/MobileMapIconContainer'
import MapContainer from './containers/MapContainer'
import MobileInformationContainer from './containers/MobileInformationContainer'
import MobileMenuDrawer from './containers/MobileMenuDrawer'

import MobileTopBar from './containers/MobileTopBar'
const { Content } = Layout;
const showDevice = false

export default class MobileView extends React.Component{
    handleScroll = (event) => {
      let offsetTop  = ReactDOM.findDOMNode(this.node)?ReactDOM.findDOMNode(this.node).getBoundingClientRect().top:0
      this.setState({offsetTop: offsetTop})
    }
  
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }
  
    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    }
  
    render() {
      return (
        <Layout className="App">
          <Layout style={{minHeight: this.props.display.height, maxWidth: this.props.display.width}}>
          {!this.props.display.fullScreenMapEnabled&&<MobileMenuDrawer />}

            {showDevice&&<span style={{position: "fixed", left:0, top: 0, zIndex: 10000, color: "red"}}>{this.props.display.deviceType}</span>}
            <Content style={{width: "100%"}}>
              {!this.props.display.fullScreenMapEnabled&&<MobileTopBar />}
              <div style={{position: "fixed", top:this.state&&this.state.offsetTop?(Math.round(0.33*(this.state.offsetTop-this.props.display.height))):0, left: 0, width: this.props.display.width, height:this.props.display.height}}>
                <MobileMapIconContainer />
                <MapContainer/>
              </div>
              {!this.props.display.fullScreenMapEnabled&&<MobileInformationContainer ref={(el) => this.node = el }/>}
            </Content>
          </Layout>
        </Layout>
    )}
  }
