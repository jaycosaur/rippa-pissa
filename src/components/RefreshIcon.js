import React from 'react'
import { Avatar } from 'antd'
import { connect } from "react-redux"
import { fetchItems } from './../actions/locationActions'

const RefreshIcon = (props) =>
        <Avatar 
          onClick = {(e) => props.dispatch(fetchItems(props.location.location,props.location.urgency.distance))}
          icon={!props.location.isFetchingItems?(props.location.location?"check-circle":"exclamation-circle"):"loading"}
          size="large" 
          style={{ backgroundColor: props.location.items?'#87d068':null,cursor: "pointer" }}
          />
  
export default connect((store) => {
  return {
    location: store.location
  }
})(RefreshIcon)