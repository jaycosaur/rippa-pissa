import React from 'react'
import algoliaicon from './../img/search-by-algolia-white.svg'

import LocationIcon from './LocationIcon.js'
import RefreshIcon from './RefreshIcon.js'
import CollapseIcon from './CollapseIcon.js'
import UrgencySlider from './UrgencySlider'

export default (props) => 
    <div style={{position: "fixed", zIndex: 100, padding: 8}}>
        <CollapseIcon />
        <span style={{margin: 8}}/>
        <LocationIcon />
        <span style={{margin: 8}}/>
        <RefreshIcon />
        <img style={{marginLeft: 16}} src={algoliaicon} height={24}/>
        <UrgencySlider />
    </div>
