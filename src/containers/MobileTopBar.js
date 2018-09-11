import { Row, Button } from 'antd';
import AddressSearchBar from './../components/AddressSearchBar'
import { connect } from 'react-redux'
import RippaPissaLogo from './../components/RippaPissaLogo'
import React from 'react'
import { focusTopSearchBar, toggleMobileMenuDisplay } from './../actions/displayActions'
import UrgencySlider from './../components/UrgencySlider'

const MobileTopBar = (props) => {
    return (
        <div style={{background: "#68D18B", position: "fixed", top: 0, left: 0, zIndex: 40, width: "100%"}}>
            {!props.display.isTopSearchFocus
            ?<Row type="flex" style={{padding: "0.5em 0.5em", width: "100%", zIndex: 0, justifyContent: "space-between"}}>
                <Button size="large" shape="circle" icon="menu-unfold" onClick={e => props.dispatch(toggleMobileMenuDisplay())}/>
                <RippaPissaLogo height="40px"/>
                <Button size="large" onClick={e => props.dispatch(focusTopSearchBar())} shape="circle" icon="search" />
            </Row>
            :<Row type="flex" style={{padding: "0.5em 0.5em", width: "100%"}}>
                <div style={{flexGrow: 1}}><AddressSearchBar /></div>
            </Row>}
            <Row type="flex" style={{padding: "0 1.5em 0.5em"}}>
                <UrgencySlider style={{width: "100%", margin: 0}} />
            </Row>
        </div>
    )
}

export default connect((store) => {
    return {
      display: store.display,
    }
  })(MobileTopBar)
