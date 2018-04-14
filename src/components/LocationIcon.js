import React from 'react'
import { Avatar } from 'antd'
import { connect } from "react-redux"
import { fetchLocation, fetchItems } from './../actions/locationActions'

const LocationIcon = (props) =>
        <Avatar 
          onClick = {(e) => props.dispatch(fetchLocation())} 
          icon={!props.location.isFetching?"environment-o":"loading"}
          size="large" 
          style={{ backgroundColor: props.location.isGPS?'#87d068':null, cursor: "pointer" }}
          />
  
export default connect((store) => {
  return {
    location: store.location
  }
})(LocationIcon)