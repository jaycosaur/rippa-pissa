import React, { Component } from 'react'
import { Avatar } from 'antd'
import { connect } from "react-redux"
import { fetchLocation } from './../actions/locationActions'

const LocationIcon = (props) =>
        <Avatar 
          onClick = {(e) => props.dispatch(fetchLocation())} 
          icon="environment-o" 
          size="large" 
          style={{ backgroundColor: props.location.isGPS?'#87d068':null }}
          />
  
export default connect((store) => {
  return {
    location: store.location
  }
})(LocationIcon)