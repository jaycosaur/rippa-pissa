import React, { Component, Fragment } from 'react'
import { connect } from "react-redux"
import { Card, Row, Icon, Avatar, Rate, Divider, message, Button } from 'antd'

import { closeInformationPanel } from './../actions/locationActions'
import { postReview } from './../actions/reviewActions'

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
                    hoverable={false}
                    bordered={false}
                    >
                    <MainTab {...this.props} {...selectedItem.info}/>
                    <SecondTab {...this.props} {...selectedItem.info}/>
                    <ThirdTab {...this.props}/>
                </Card>):null
        )
    }
}

const LocationGrid = (props) =>
    <Card bordered={false} style={{width: "100%", display: "flex", alignItems: "center"}}>
        <Icon type="environment" style={{marginRight: 20}}/> 
        <span>
            {`${props.Address1}, ${props.Town}, ${props.Postcode}, ${props.State} `}
            <a target="_blank" href={`http://maps.google.com/?daddr=${props.Latitude},${props.Longitude}`}>(Directions)</a>
        </span>
    </Card>

const MainTab = (props) =>
    <Fragment>
        <RatingRow {...props}/>
        <OpeningHours  {...props}/>
        <Divider style={{margin: "0.5em"}}/>
        <LocationGrid {...props}/>
        <Divider style={{margin: "0.5em"}}/>
        <Card bordered={false} style={{padding: 0, margin: 0, width: "100%"}} bodyStyle={{padding: "0.25em", display: "flex", flexWrap: "wrap"}}>
            <FeatureGrid {...props}/>
        </Card>
        <Divider style={{margin: 0}}/>
    </Fragment>


const SecondTab = (props) =>
    <Fragment>
        <Divider style={{margin: 0}}/>
        {/*<OtherRatings disabled/>*/}
    </Fragment>

const ThirdTab = (props) =>
    <Fragment>
        <UserOverallRatingGrid {...props} />
    </Fragment>

const featureItems = [
    {item: "Male", icon: "man", key:"Male"},
    {item: "Female", icon: "woman", key:"Female"},
    {item: "Key", icon: "key",key:"KeysRequired"},
    {item: "Parking", icon: "car",key:"Parking"},
    {item: "Payment", icon: "pay-circle-o",key:"Payment"},
    {item: "Access Limited", icon: "tag-o",key:"Access Limited"},
    {item: "Accessible Male", icon: "man",key:"Accessible Male"},
    {item: "Accessible Female", icon: "woman",key:"Accessible Female"},
    {item: "Accessible Unisex", icon: "tag-o",key:"Accessible Unisex"},
    {item: "Parking Accessible", icon: "car",key:"Parking Accessible"},
    {item: "Ambulant", icon: "tag-o",key:"Ambulant"},
    {item: "Adult Change", icon: "tag-o",key:"Adult Change"},
    {item: "Baby Change", icon: "tag-o",key:"Baby Change"},
    {item: "Showers", icon: "tag-o",key:"Showers"},
    {item: "Drinking Water", icon: "tag-o",key:"Drinking Water"},
    {item: "Sharps Disposal", icon: "tag-o",key:"Sharps Disposal"},
    {item: "Sanitary Disposal", icon: "tag-o",key:"Sanitary Disposal"}
]

const FeatureGrid = (props) =>
    featureItems.map(item =>
        <Card bordered={false} key={item.item} style={{color:props[item.key]==="TRUE"?null:"#fff", width: "18%", height: 80, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
            <Icon style={{margin: 4, position: "absolute", right: 0, top: 0, color: props[item.key]==="TRUE"?'#87d068':"red"}} type={props[item.key]==="TRUE"?"check-circle-o":""} />
            <Icon style={{fontSize: "200%", color:props[item.key]==="TRUE"?null:"#ccc"}} type={item.icon} />
            <small style={{color: props[item.key]==="TRUE"?null:"#ccc" }}>{item.item}</small>
        </Card>
    )

const OpeningHours = (props) =>
    <Card bordered={false} style={{width: "100%", height: 75}}>
        <Icon type="clock-circle-o" style={{marginRight: 20}}/> {props.OpeningHoursSchedule||"No Information Available."}
    </Card>

const WaitingTime = (props) =>
    <Card bordered={false} style={{width: "100%", height: 75}}>
        <Icon type="hourglass" style={{marginRight: 20}}/> No wait today!
    </Card>


const IconStyleBase = {
    lineHeight: "40px",
    fontSize: "200%"
}

const IconStyleSelected = {
    lineHeight: "40px",
    fontSize: "400%"
}

const RankRating = (props) => {
    const rating = props.rating
    if(rating>95){
        return <React.Fragment><Icon type="trophy" /> A Golden Throne!</React.Fragment>
    } else if (rating>80) {
        return <React.Fragment><Icon type="safety" /> Certified Rippa!</React.Fragment>
    } else if (rating>70) {
        return <React.Fragment><Icon type="star" /> A Shining Star</React.Fragment>
    } else if (rating>=60) {
        return <React.Fragment><Icon type="meh-o" /> OK</React.Fragment>
    } else if (rating>40) {
        return <React.Fragment><Icon type="frown-o" /> A bit shit</React.Fragment>
    } else {
        return <React.Fragment><Icon type="exclamation-circle-o" /> Avoid at all costs</React.Fragment>
    }
}

const RatingRow = (props) => {

    const isLoaded = props.review.ratings[props.location.selectedItem.info.ToiletID]
    const rating = isLoaded?props.review.ratings[props.location.selectedItem.info.ToiletID].rating:null
    const hasRatings = isLoaded&&props.review.ratings[props.location.selectedItem.info.ToiletID].countTotal
    const color = hasRatings?(rating<60?"#F42B03":"#49CE75"):null

    return (
        <Card bordered={false} style={{width: "100%", height: 200, display: "flex", textAlign: "center",flexDirection: "column", background: "#fff"}}>
            <Row style={{display: "flex", width: "100%", height: "100%", justifyContent: "space-evenly", alignItems: "center"}}>
                {(hasRatings)?(rating>60?<Icon type="like" style={{fontSize: "64px", color: color}}/>:<Icon type="dislike" style={{fontSize: "64px", color:  color}}/>):null}
                <span style={{fontSize: "64px", fontWeight: "300", color:  color}}>
                    {isLoaded?(hasRatings?`${rating}%`:`-`):<Icon type="loading" />}
                </span>
            </Row>
            <div style={{fontSize: "24px", color:  color}}>
                {isLoaded&&(hasRatings?<RankRating rating={rating}/>:"No ratings yet. You've been warned.") }
            </div>
            {hasRatings&&<div style={{marginTop: "0.5em"}}>
                Based on {props.review.ratings[props.location.selectedItem.info.ToiletID].countTotal} review{props.review.ratings[props.location.selectedItem.info.ToiletID].countTotal>1&&"s"}
            </div>}
        </Card>
    )
}
    

const RatingRowOld = (props) => 
    <Card.Grid style={{width: "100%", height: 200, display: "flex", textAlign: "center",flexDirection: "column"}}>
        <Row style={{display: "flex", width: "100%", height: "100%", justifyContent: "space-evenly", alignItems: "center"}}>
            <Icon type="frown-o" style={IconStyleBase}/>
            <Icon type="meh-o" style={IconStyleBase}/>
            <Icon type="smile-o" style={IconStyleSelected}/>
        </Row>
        <h2>Rippa Pissa!</h2>
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
        hoverKey: null,
        reviewedQuick: false,
        reviewedLong: false,
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
            selectKey: key,
            reviewedQuick: true
        })
        e.stopPropagation()
        this.props.dispatch(postReview({toiletId: this.props.location.selectedItem.info.ToiletID, rating: key }))
        message.success('LooReview submitted successfully!')
    }

    submitLongReview = (e) => {
        this.setState({
            reviewedLong: true
        })
        e.stopPropagation()
        message.success(<span>You're a bloody legend! <Icon type="heart" /></span>)
    }

    onDeSelect = (key) => {
        this.setState({
            isSelected: false,
            selectKey: null
        })
    }

    render() {
        const styleHover = {
            fontSize: 80,
            flexGrow: 1,
            alignSelf: "center"
        }
        const styleDefault = {
            fontSize: 64,
            flexGrow: 1,
            alignSelf: "center"
        }
        const styleSelected = {
            fontSize: 64,
            flexGrow: 1,
            color: "#fadb14",
            alignSelf: "center"
        }
        


        const ratingDescription = () => {
            switch(this.state.selectKey){
                case 1:
                    return "A shining star."
                case 0:
                    return "A bit shit."
                default: 
                    return null
            }
        }
        return (
            <React.Fragment>
                <Card.Grid style={{width: "100%", textAlign: "center"}}>
                    <Divider style={{color:"#49CE75", width: "100%"}}><strong>{!this.props.review.reviews[this.props.location.selectedItem.info.ToiletID]?`Leave a ${this.state.reviewedQuick?"":""}LooReview`:`You left a LooReview!`}</strong></Divider>
                    {
                        !this.props.review.reviews[this.props.location.selectedItem.info.ToiletID]?
                            <React.Fragment>
                                <div style={{width: "100%"}}><span style={{fontSize: 24}}>{!this.state.isSelected?"Choose your rating":ratingDescription()}</span></div>
                                <Card.Grid style={{width: "50%", height: 160, display: "flex", textAlign: "center", alignContent: "center", lineHeight: 80}}>
                                        <Icon 
                                            onClick={e=>this.onSelect(1,e)} 
                                            onMouseEnter={e=>this.onMouseEnter(1)} 
                                            onMouseLeave={this.onMouseLeave} 
                                            type="like" 
                                            style={this.state.selectKey===1?styleSelected:(this.state.hoverKey===1?styleHover:styleDefault)}
                                            />
                                </Card.Grid>
                                <Card.Grid style={{width: "50%", height: 160, display: "flex", textAlign: "center", alignContent: "center", lineHeight: 80}}>
                                        <Icon 
                                            onClick={e=>this.onSelect(0,e)} 
                                            onMouseEnter={e=>this.onMouseEnter(0)} 
                                            onMouseLeave={this.onMouseLeave} 
                                            type="dislike" 
                                            style={this.state.selectKey===0?styleSelected:(this.state.hoverKey===0?styleHover:styleDefault)}
                                            />
                                </Card.Grid>
                            </React.Fragment>
                        :   <Card hoverable={false} style={{width: "100%", display: "flex", textAlign: "center", flexDirection: "column"}}>
                                You Go Glen Coco! Gold star for you! <Icon type="star" style={{color: "gold"}}/>
                            </Card>
                    }
                    
                </Card.Grid>
            </React.Fragment>
        )
    }
}

/*

                            !this.state.reviewedLong
                            ?<Card hoverable={false} style={{width: "100%", display: "flex", textAlign: "center", flexDirection: "column"}}>
                                Fancy giving us a bit more info?
                                <Divider />
                                <OtherRatings />
                                <Divider />
                                <Button type="primary" onClick={this.submitLongReview}>Submit your LooReview <Icon type="right-square-o" /></Button>
                            </Card>
                            :
*/

const OtherRatings = (props) =>
    <Card bordered={false} style={{width: "100%", display: "flex", flexDirection: "column"}}>
        <ItemRatingRow disabled={props.disabled} icon="home" text="Homely" value={3} />
        <ItemRatingRow disabled={props.disabled} icon="rocket" text="Clean" value={3.5} />
        <ItemRatingRow disabled={props.disabled} icon="notification" text="Noisey" value={4.5} />
        <ItemRatingRow disabled={props.disabled} icon="lock" text="Door Locks" value={2.5} />
        <ItemRatingRow disabled={props.disabled} icon="wifi" text="WiFi" value={1.1} />
        <ItemRatingRow disabled={props.disabled} icon="bulb" text="Lighting" value={2} />
    </Card>


export default connect((store) => {
    return {
      location: store.location,
      review: store.review
    }
  })(ItemInformationCard)
