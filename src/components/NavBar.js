import React from 'react'
import { Layout } from 'antd'
import AddressSearchBar from './../components/AddressSearchBar'

import LocationIcon from './LocationIcon.js'
const { Header } = Layout;


export default (props) => 
<Header style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
    <img alt="LOGO" src="http://webiconspng.com/wp-content/uploads/2017/09/Toilet-Paper-PNG-Image-22674.png" width={48} height={48} />
    <AddressSearchBar />
    <LocationIcon />
</Header>
