
import React, { Component } from 'react';
import withWindowDimensions from './../withWindowDimensions'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Layout, Button, Alert } from 'antd';
import RippaPissaLogo from './../components/RippaPissaLogo'
import InfoIcon from './../components/InfoIcon'

const IntroView = (props) => {
    switch(props.display.deviceType){
        case "mobile":
        return <MobileView {...props}/>
        case "tablet":
        return <MobileView {...props}/>
        case "desktop":
        return <DesktopView {...props}/>
        default:
        return <MobileView {...props}/>
    }
}

export default connect((store) => {
    return {
        display: store.display
    }
    })(withWindowDimensions(IntroView))

const gradient = {
    background: '#144b53', /* Old browsers */
    background: '-moz-linear-gradient(-45deg, #144b53 0%, #49ce75 100%)', /* FF3.6-15 */
    background:' -webkit-linear-gradient(-45deg, #144b53 0%,#49ce75 100%)', /* Chrome10-25,Safari5.1-6 */
    background: 'linear-gradient(135deg, #144b53 0%,#49ce75 100%)', /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#144b53', endColorstr='#49ce75',GradientType=1 )", /* IE6-9 fallback on horizontal gradient */
}  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#144b53+0,49ce75+100 */

const showInfo = false

const DesktopView = (props) => (
    <Layout className="App">
        <Layout style={{minHeight: "100vh", height: props.display.height, width: props.display.width}}>
            {showInfo&&<InfoIcon style={{position: "fixed", right:"0.5em", top: "0.5em"}}/>}
            <div style={{background: "#144B53", ...gradient, height: "50vh", width: props.display.width, display: "flex", justifyContent: "center", alignItems: "center"}}>
                <RippaPissaLogo height="200px"/>
            </div>
            <div style={{padding: "3em", background: "#fff", height: "50vh", width: props.display.width, display: "flex", justifyContent: "center", alignItems: "center", alignContent: "space-around", flexDirection: "row", flexWrap: "wrap"}}>
                <div style={{width: "80%", fontSize: "4em", fontWeight: 900, color: "#49CE75", textAlign: "center"}}>
                    Your guide to Australian toilets.
                </div>
                <Link to="/main"><IntroButton /></Link>
            </div>
        </Layout>
    </Layout>
)
    
const MobileView = (props) => (
    <Layout className="App">
        <Layout style={{height: "100vh", width: props.display.width}}>
            {showInfo&&<InfoIcon size="small" style={{position: "fixed", right:"0.5em", top: "0.5em"}}/>}
            <div style={{...gradient, height: "50vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <RippaPissaLogo split width={props.display.width-30}/>
            </div>
            <div style={{padding: "1em", background: "#fff", height: "50vh", width: props.display.width, display: "flex", justifyContent: "center", alignItems: "center", alignContent: "space-around", flexDirection: "row", flexWrap: "wrap"}}>
                <div style={{width: props.display.width-40, fontSize: "2.5em", fontWeight: 900, color: "#49CE75", textAlign: "center"}}>
                    Your guide to Australian toilets.
                </div>
                <Link to="/main"><IntroButton mobile/></Link>
            </div>
        </Layout>
    </Layout>
)

class IntroButton extends Component {
    state = {
        isHovered: false
    }

    mouseEnter = () => this.setState({isHovered: true})
    mouseLeave = () => this.setState({isHovered: false})

    render() {
        const desktopTheme = {
            borderRadius: 50, width: 500, height: 100, fontSize: 40, marginBottom: "1em", 
        }
        const defaultTheme = {
            background: "#49CE75",
            color: "white",
            border: "solid 2px #49CE75"
        }
        const onHoverTheme = {
            color: "#49CE75",
            background: "white",
            border: "solid 2px #49CE75"
        }
        const hoverTheme = this.state.isHovered?onHoverTheme:defaultTheme
        const mobileTheme = { 
            borderRadius: 50, 
            fontSize: "1.5em",
            width: "100%",
            marginBottom: "2em",
            height: "3em",
        }
        const baseTheme = this.props.mobile?mobileTheme:desktopTheme
        return (
            <Button onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} size="large" style={{...baseTheme, ...hoverTheme}}>LET'S GET STARTED {this.state.isHovered}</Button>
        )
    }
}