import React, { Component, Fragment } from 'react'
import { Card, Row, Col, Icon, Avatar, Rate, Tabs } from 'antd'
const TabPane = Tabs.TabPane;

export default class PopOverContainer extends Component {
    state={
        currentPage: 1,
        isShowing: true
    }
    render() {
        const cardActions = [
            <span onClick={e => this.setState({currentPage: 1})}><Icon type="global" /> ABOUT</span>, 
            <span onClick={e => this.setState({currentPage: 2})}><Icon type="profile" /> FEATURES</span>, 
            <span onClick={e => this.setState({currentPage: 3})}><Icon type="star" /> RATE</span>
        ]

        const tabSelect = () => 
            {switch(this.state.currentPage){
                case 1:
                    return <MainTab />
                case 2: 
                    return <SecondTab />
                case 3:
                    return <ThirdTab />
            }}
        
        return (
            this.state.isShowing&&<div style={{position: "absolute", zIndex: 1000, marginLeft: 30, marginTop: 30}} > 
                <Card 
                    bodyStyle={{width: 400, height: 450, padding: 0}} 
                    title="Level 4 Bathroom Westfield Woden" 
                    extra={<Avatar size="small" icon="cross" onClick={e => this.setState({isShowing: false})}/>}
                    actions= {cardActions}
                    bordered={false}
                    >
                    {tabSelect()}
                </Card>
            </div>
        )
    }
}

const LocationGrid = (props) =>
    <Card.Grid style={{width: "100%", display: "flex", alignItems: "center"}}>
        <Icon type="environment" style={{marginRight: 20}}/> <span>123 South Street, Canberra, 2600, ACT <a>Directions ... </a></span>
    </Card.Grid>

const MainTab = (props) =>
    <Fragment>
        <RatingRow />
        <OpeningHours/>
        <WaitingTime />
        <FeatureGrid />
    </Fragment>


const SecondTab = (props) =>
    <Fragment>
        <LocationGrid />
        <OtherRatings disabled/>
    </Fragment>

const ThirdTab = (props) =>
    <Fragment>
        <UserOverallRatingGrid />
        <OtherRatings />
    </Fragment>

const featureItems = [
    {item: "Male", icon: "man"},
    {item: "Woman", icon: "woman"},
    {item: "Key", icon: "key"},
    {item: "Parking", icon: "car"},
]
const FeatureGrid = (props) =>
    featureItems.map(item =>
        <Card.Grid style={{width: "25%", height: 100, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
            <Icon style={{fontSize: "200%", marginBottom: 10}} type={item.icon} />
            {item.item}
        </Card.Grid>
    )

const OpeningHours = (props) =>
    <Card.Grid style={{width: "100%", height: 75}}>
        <Icon type="clock-circle-o" style={{marginRight: 20}}/> Open today from 9am to 5pm
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
