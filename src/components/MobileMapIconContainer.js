import React from 'react'
import algoliaIconWhite from './../img/search-by-algolia-white.svg'
import algoliaIcon from './../img/search-by-algolia.svg'

import LocationIcon from './LocationIcon.js'
import RefreshIcon from './RefreshIcon.js'

import { connect } from 'react-redux'

const MobileMapIconContainer = (props) => 
        <div style={{position: "inherit", zIndex: 100, padding: 8, bottom: 0, marginBottom: 0}}>
            <LocationIcon />
            <span style={{margin: 8}}/>
            <RefreshIcon />
            <img style={{marginLeft: 16}} src={props.display.lightTheme?algoliaIcon:algoliaIconWhite} height={24}/>
        </div>

export default connect((store) => {
    return {
      location: store.location,
      display: store.display
    }
  })(MobileMapIconContainer)

