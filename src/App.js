import React, { Component } from 'react';
import './App.css';

import DATA_SAMP from './sampleJessData.json'

// import firebase connection object
//import { BASE } from './base'

// import bits and pieces
import { GoogleApiWrapper } from 'google-maps-react';
import { Layout, Button } from 'antd';

import NavBar from './components/NavBar'
import MapContainer from './containers/MapContainer'
import PopOverContainer from './containers/PopOverContainer'

import store from './store/store'

const appStore = store

// sub components
const { Content } = Layout;

export default class App extends Component {
  constructor(props){
    super(props)
    this.state= {
      
    }
  }

  render() {
    return (
        <Layout className="App">
          <div>
              {DATA_SAMP.response.results.map(item => item.alternatives[0].transcript).map(item => <p>{item}</p>)}
          </div>
          <Layout style={{minHeight: "100vh"}}>
            <NavBar />
            <Content style={{width: "100%"}}>
              <PopOverContainer />
              <MapContainer/>
            </Content>
          </Layout>
        </Layout>
    );
  }
}

/*const fetchHOC = (WrappedComponent, fetchPath, optionalHeader) => {
  return class extends Component {
    constructor(props){
      super(props)
      this.state = {
        data: null,
        isError: false,
        isFetching: true
      }
    }

    async componentWillMount(){
      var header = optionalHeader?optionalHeader:null
      await fetch(fetchPath, header)
        .then(response => response.json())
        .then(data => this.setState({data: data}))
        .catch((err) => this.setState({isError: err}))
    }

    render() {
      return <WrappedComponent 
                data={this.state.data} 
                isError={this.state.isError} 
                isFetching={this.state.isFetching}
                {...this.props} />
    }
  }
}

class APIFetch extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: null,
      isError: false,
      isFetching: true
    }
  }

  async componentWillMount(){
    var header = this.props.optionalHeader?this.props.optionalHeader:null
    await fetch(this.props.fetchPath, header)
      .then(response => response.json())
      .then(data => this.setState({data: data}))
      .catch((err) => this.setState({isError: err}))
  }

  render() {
    return this.props.render(this.state)
  }
}*/
