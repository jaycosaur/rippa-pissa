import React, { Component, Fragment } from 'react'
import { connect } from "react-redux"
import { Card, Row, Icon, Avatar, Rate } from 'antd'

import { closeInformationPanel } from './../actions/locationActions'

class ItemInformationCard extends Component {
    state={
        currentPage: 1
    }
    render() {
        const cardActions = [
            <span onClick={e => this.setState({currentPage: 1})}><Icon type="global" /> ABOUT</span>, 
            <span onClick={e => this.setState({currentPage: 2})}><Icon type="profile" /> FEATURES</span>, 
            <span onClick={e => this.setState({currentPage: 3})}><Icon type="star" /> RATE</span>
        ]

        const tabSelect = (props) => 
            {switch(this.state.currentPage){
                case 1:
                    return <MainTab {...props}/>
                case 2: 
                    return <SecondTab {...props}/>
                case 3:
                    return <ThirdTab {...props}/>
            }}
        const { selectedItem } = this.props.location
        return (
            (selectedItem&&selectedItem.showItemInformation)?
            (<Card 
                    bodyStyle={{width: '100%', height: "100%", padding: 0}} 
                    style={{borderRadius: 0}}
                    title={selectedItem.info.Name}
                    extra={<Avatar style={{cursor: "pointer"}} size="small" icon="cross" onClick={e => this.props.dispatch(closeInformationPanel())}/>}
                    actions= {cardActions}
                    bordered={false}
                    >
                    <MainTab {...selectedItem.info}/>
                    <SecondTab {...selectedItem.info}/>
                    <ThirdTab {...selectedItem.info}/>
                </Card>):null
        )
    }
}

const LocationGrid = (props) =>
    <Card.Grid style={{width: "100%", display: "flex", alignItems: "center"}}>
        <Icon type="environment" style={{marginRight: 20}}/> <span>{`${props.Address1}, ${props.Town}, ${props.Postcode}, ${props.State} `}<a>Directions ... </a></span>
    </Card.Grid>

const MainTab = (props) =>
    <Fragment>
        <RatingRow />
        <OpeningHours  {...props}/>
        <WaitingTime />
        <FeatureGrid {...props}/>
    </Fragment>


const SecondTab = (props) =>
    <Fragment>
        <LocationGrid {...props}/>
        <OtherRatings disabled/>
    </Fragment>

const ThirdTab = (props) =>
    <Fragment>
        <Card.Grid style={{width: "100%", display: "flex", alignItems: "center", background: "#87d068"}}>
            <span style={{color: "white", fontSize: "14px"}}>Leave your rating</span>
        </Card.Grid>
        <UserOverallRatingGrid />
        <OtherRatings />
    </Fragment>

const featureItems = [
    {item: "Male", icon: "man", key:"Male"},
    {item: "Female", icon: "woman", key:"Female"},
    {item: "Key", icon: "key",key:"KeysRequired"},
    {item: "Parking", icon: "car",key:"Parking"},
    {item: "Payment", icon: "pay-circle-o",key:"Payment"},
    {item: "Access Limited", icon: "car",key:"Access Limited"},
    {item: "Accessible Male", icon: "car",key:"Accessible Male"},
    {item: "Accessible Female", icon: "car",key:"Accessible Female"},
    {item: "Accessible Unisex", icon: "car",key:"Accessible Unisex"},
    {item: "Parking Accessible", icon: "car",key:"Parking Accessible"},
    {item: "Ambulant", icon: "car",key:"Ambulant"},
    {item: "Adult Change", icon: "car",key:"Adult Change"},
    {item: "Baby Change", icon: "car",key:"Baby Change"},
    {item: "Showers", icon: "car",key:"Showers"},
    {item: "Drinking Water", icon: "car",key:"Drinking Water"},
    {item: "Sharps Disposal", icon: "car",key:"Sharps Disposal"},
    {item: "Sanitary Disposal", icon: "car",key:"Sanitary Disposal"}
]

const FeatureGrid = (props) =>
    featureItems.map(item =>
        <Card.Grid key={item.item} style={{color:props[item.key]==="TRUE"?null:"#fff", background: props[item.key]==="TRUE"?null:"#ccc", width: "25%", height: 100, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
            <Icon style={{margin: 4, position: "absolute", right: 0, top: 0, color: props[item.key]==="TRUE"?'#87d068':"red"}} type={props[item.key]==="TRUE"?"check-circle-o":"close-circle-o"} />
            <Icon style={{fontSize: "200%", marginBottom: 10, color:props[item.key]==="TRUE"?null:"#fff"}} type={item.icon} />
            {item.item}
        </Card.Grid>
    )

const OpeningHours = (props) =>
    <Card.Grid style={{width: "100%", height: 75}}>
        <Icon type="clock-circle-o" style={{marginRight: 20}}/> {props.OpeningHoursSchedule||"No Information Available."}
    </Card.Grid>

const WaitingTime = (props) =>
    <Card.Grid style={{width: "100%", height: 75}}>
        <Icon type="hourglass" style={{marginRight: 20}}/> No wait today!
    </Card.Grid>


const IconStyleBase = {
    lineHeight: "40px",
    fontSize: "200%"
}

const IconStyleSelected = {
    lineHeight: "40px",
    fontSize: "400%"
}

const UserRate = (props) =>
    <Card.Grid style={{width: "100%", height: 200, display: "flex", textAlign: "center",flexDirection: "column"}}>
        <Row style={{display: "flex", width: "100%", height: "100%", justifyContent: "space-evenly", alignItems: "center"}}>
            <Icon type="frown-o" style={IconStyleSelected}/>
            <Icon type="meh-o" style={IconStyleSelected}/>
            <Icon type="smile-o" style={IconStyleSelected}/>
        </Row>
    </Card.Grid>


const RatingRow = (props) => 
    <Card.Grid style={{width: "100%", height: 200, display: "flex", textAlign: "center",flexDirection: "column"}}>
        <Row style={{display: "flex", width: "100%", height: "100%", justifyContent: "space-evenly", alignItems: "center"}}>
            <Icon type="frown-o" style={IconStyleBase}/>
            <Icon type="meh-o" style={IconStyleBase}/>
            <Icon type="smile-o" style={IconStyleSelected}/>
        </Row>
        <h2>Rippa Pissa!</h2>
    </Card.Grid>

const OtherRatings = (props) =>
    <Card.Grid style={{width: "100%", display: "flex", flexDirection: "column"}}>
        <ItemRatingRow disabled={props.disabled} icon="home" text="Homely" value={3} />
        <ItemRatingRow disabled={props.disabled} icon="rocket" text="Clean" value={3.5} />
        <ItemRatingRow disabled={props.disabled} icon="notification" text="Noisey" value={4.5} />
        <ItemRatingRow disabled={props.disabled} icon="lock" text="Door Locks" value={2.5} />
        <ItemRatingRow disabled={props.disabled} icon="wifi" text="WiFi" value={1.1} />
        <ItemRatingRow disabled={props.disabled} icon="bulb" text="Lighting" value={2} />
    </Card.Grid>

const ItemRatingRow = (props) =>
    <Row style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
        <span style={{textAlign: "left"}}>
            <Icon type={props.icon}/> {props.text}
        </span>
        <Rate allowHalf disabled={props.disabled} defaultValue={props.value} />
    </Row>

class UserOverallRatingGrid extends Component {
    state={
        isHovered: false,
        isSelected: false,
        selectKey: null,
        hoverKey: null
    }

    onMouseEnter = (key) => {
        this.setState({
            isHovered: true,
            hoverKey: key
        })
    }

    onMouseLeave = () => {
        this.setState({
            isHovered: false,
            hoverKey: null
        })
    }

    onSelect = (key, e) => {
        this.setState({
            isSelected: true,
            selectKey: key
        })
        e.stopPropagation()
    }

    onDeSelect = (key) => {
        this.setState({
            isSelected: false,
            selectKey: null
        })
    }

    render() {
        const styleHover = {
            fontSize: "350%"
        }
        const styleDefault = {
            fontSize: "300%"
        }
        const styleUnhovered = {
            fontSize: "250%"
        }

        const ratingDescription = () => {
            switch(this.state.selectKey){
                case 1:
                    return "Shit Hole"
                case 2:
                    return "A bit meh"
                case 3:
                    return "Rippa Pissa"
                default: 
                    return null
            }
        }
        return (
            <Card.Grid style={{width: "100%", height: 200, display: "flex", textAlign: "center",flexDirection: "column"}}>
                <Row onClick={e=>this.onDeSelect()} style={{display: "flex", width: "100%", height: "100%", justifyContent: "space-between", alignItems: "center"}}>
                    <Icon onClick={e=>this.onSelect(1,e)} onMouseEnter={e=>this.onMouseEnter(1)} onMouseLeave={this.onMouseLeave} type="frown-o" style={this.state.isSelected?(this.state.selectKey===1?styleHover:styleUnhovered):styleDefault}/>
                    <Icon onClick={e=>this.onSelect(2,e)} onMouseEnter={e=>this.onMouseEnter(2)} onMouseLeave={this.onMouseLeave} type="meh-o" style={this.state.isSelected?(this.state.selectKey===2?styleHover:styleUnhovered):styleDefault}/>
                    <Icon onClick={e=>this.onSelect(3,e)} onMouseEnter={e=>this.onMouseEnter(3)} onMouseLeave={this.onMouseLeave} type="smile-o" style={this.state.isSelected?(this.state.selectKey===3?styleHover:styleUnhovered):styleDefault}/>
                </Row>
                <span>{this.state.isSelected&&ratingDescription()}</span>
                <span>{this.state.selectKey}</span>
            </Card.Grid>
        )
    }
}

export default connect((store) => {
    return {
      location: store.location,
    }
  })(ItemInformationCard)
