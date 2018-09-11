import React from 'react'
import { connect } from 'react-redux'
import { Card, Button, Avatar, Switch, Divider, Row, Icon } from 'antd'
import { toggleMobileMenuDisplay, toggleMapTheme } from './../actions/displayActions'
import AuthComponent from './../components/AuthComponent'

const MobileMenuDrawer = (props) => {
  return (
    props.display.showMobileMenu&&
    <div style={{top:0, left:0, zIndex: 50000, position: "fixed", height: "100%", width: props.display.width, display:"flex", }}>
        <div style={{opacity: 0.98, padding: "0.5em", background: "white", height: "100%", width: props.display.width/2}}>
                <Button size="large" shape="circle" icon="menu-fold" onClick={e => props.dispatch(toggleMobileMenuDisplay())}/>
                <div>
                    <Avatar icon="user" size="large"/>
                    <p><strong>You are not signed in.</strong></p>
                    <Row gutter={8}><Button disabled>Signin</Button><Button disabled>Signup</Button></Row>
                    <p>By signing up you can add new toilet features, locations, add images and will help to review features added by others.</p>
                </div>
                <Divider />
                <div>
                    <div><strong>Your Contributions</strong></div>
                    <p>You have not contributed anywhere on Rippapissa yet. Why not give it a go?</p>
                </div>
                <Divider />
                <div>
                    <p><strong>Settings and Controls</strong></p>
                    <p>{props.display.lightTheme?"Disable Light Theme":"Enable Light Theme"} <Switch checkedChildren={<Icon type="check" />} onChange={e => props.dispatch(toggleMapTheme())} unCheckedChildren={<Icon type="cross" />} checked={props.display.lightTheme} /></p>
                </div>
        </div>
        <div style={{padding: "0.5em", opacity: 0.4,background: "black",height: "100%", width: props.display.width/2}}/>
    </div>
  )
}

export default connect((store) => {
    return {
        display: store.display
    }
    })(MobileMenuDrawer)
