import React from 'react'
import algoliaIconWhite from './../img/search-by-algolia-white.svg'
import algoliaIcon from './../img/search-by-algolia.svg'
import { connect } from "react-redux"


import LocationIcon from './LocationIcon.js'
import RefreshIcon from './RefreshIcon.js'
import CollapseIcon from './CollapseIcon.js'
import UrgencySlider from './UrgencySlider'

const IconContainer = (props) => 
    <div style={{position: "fixed", zIndex: 100, padding: 8}}>
        <CollapseIcon />
        <span style={{margin: 8}}/>
        <LocationIcon />
        <span style={{margin: 8}}/>
        <RefreshIcon />
        <img style={{marginLeft: 16}} src={props.display.lightTheme?algoliaIcon:algoliaIconWhite} height={24}/>
        <UrgencySlider />
    </div>


export default connect((store) => {
    return {
      display: store.display
    }
  })(IconContainer)