import React from 'react'
import { Avatar } from 'antd'
import { connect } from "react-redux"
import { toggleSideBar } from './../actions/displayActions'


const RefreshIcon = (props) =>
        <Avatar 
          onClick = {(e) => props.dispatch(toggleSideBar())}
          icon={props.display.showSideBar?"menu-fold":"menu-unfold"}
          size="large" 
          style={{ backgroundColor:'#49CE75',cursor: "pointer" }}
          />
  
export default connect((store) => {
  return {
    display: store.display
  }
})(RefreshIcon)