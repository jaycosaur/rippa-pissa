import React from 'react'
import logoWhite from './../img/rippapissa-logo-white@2x.png'
import logoDark from './../img/rippapissa-logo-dark@2x.png'
import logoGreen from './../img/rippapissa-logo-green@2x.png'
import logoSplit from './../img/rippapissa-logo-white-split@2x.png'


export default (props) => {
    const logo = !props.split?(props.white?logoWhite:(props.dark?logoDark:(props.green?logoGreen:logoWhite))):logoSplit
    return (
        <img src={logo} width={props.width} height={props.height} style={props.style}/>
    )
}
