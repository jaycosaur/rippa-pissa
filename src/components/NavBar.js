import React from 'react'
import { Layout, Row} from 'antd'
import AddressSearchBar from './../components/AddressSearchBar'
import algoliaicon from './../img/search-by-algolia-white.svg'

import LocationIcon from './LocationIcon.js'
import RefreshIcon from './RefreshIcon.js'

const { Header } = Layout;


export default (props) => 
<Header style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
    <img alt="LOGO" src="http://webiconspng.com/wp-content/uploads/2017/09/Toilet-Paper-PNG-Image-22674.png" width={48} height={48} />
    <AddressSearchBar />
    <Row gutter={16}>
        <img style={{marginLeft: 16}} src={algoliaicon} height={24}/>
        <RefreshIcon />
        <span style={{margin: 16}}/>
        <LocationIcon />
    </Row>
</Header>
