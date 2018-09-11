import React from 'react'
import { Avatar } from 'antd'
import { connect } from "react-redux"

const InfoIcon = (props) =>
        <Avatar 
          icon="info"
          size={props.size?props.size:"large"}
          style={{ backgroundColor: "#F42B03", cursor: "pointer", ...props.style }}
          />
  
export default connect((store) => {
  return {
    display: store.display
  }
})(InfoIcon)