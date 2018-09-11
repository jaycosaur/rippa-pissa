import React, { Component } from 'react'
import { connect } from "react-redux"


import MainMap from './../components/MainMap'
import { updateMapDimensions } from './../actions/mapActions'


class MapContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            mapHeight: window.innerHeight,
            mapWidth: window.innerWidth 
        }
    }
    resize = (event) => {
        const dimObj = {
            width: event.target.innerWidth,
            height: event.target.innerHeight
        }
        this.props.dispatch(updateMapDimensions(dimObj))
    }
    componentDidMount() {
        window.addEventListener('resize', this.resize)
        const dimObj = {
            width: window.innerWidth,
            height: window.innerHeight-64
        }
        this.props.dispatch(updateMapDimensions(dimObj))
    }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
      }
    render() {
        return (
            <MainMap mapHeight = {this.state.mapHeight} mapWidth = {this.state.mapWidth}/>
        )
    }
}

export default connect((store) => {
    return {
      map: store.map,
      display: store.display
    }
  })(MapContainer)