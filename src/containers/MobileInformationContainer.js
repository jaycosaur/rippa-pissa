import { List, Avatar, Icon, Card} from 'antd';
import ItemInformationCard from './../components/ItemInformationCard'
import { connect } from 'react-redux'
import { selectItemOnMap, fetchClosestItems } from './../actions/locationActions'
import { getRating } from './../actions/reviewActions'
import calculateDistanceTo from './../functions/calculateDistanceTo'

import React, {Component} from 'react'

class SideBar extends Component {

    onScroll = () => {
        let offsetTop  = this.instance.getBoundingClientRect().top
        console.log("scolling!")
        console.log(offsetTop)
    }
    
    render(){
        const { selectedItem } = this.props.location
        const items = this.props.location.items
        const hasItems = items&&this.props.location.items.hits.length>0
        const showItemInformation = selectedItem&&selectedItem.showItemInformation
        const numItems = items&&this.props.location.items.hits.length
        const numRippas = items&&Object.keys(this.props.review.ratings).map(i => this.props.review.ratings[i].rating).filter(i => i>80).length
        return (    
            items
            ?<div style={{marginTop: this.props.display.height, top: 0, left: 0, position: "absolute", width: this.props.display.width }} onScroll={this.onScroll}>
                {hasItems&&showItemInformation
                ?<ItemInformationCard />
                :<Card style={{borderRadius: 0}} bodyStyle={{padding: 0}}>
                    {hasItems&&!showItemInformation
                    ?<Card 
                        style={{borderRadius: 0}}
                        bodyStyle={{height: "60px", padding: "0em", display: "flex", justifyContent: "space-between", alignItems: "center"}}
                        >
                        <Avatar size="small" icon="up" /> 
                        {`Found ${numItems} pissa${numItems!==1?"s":""}, ${numRippas} of 'em ${numRippas!==1?"are rippas!":"is a rippa!"}`}
                    </Card>
                    :null}
                    {hasItems?<List
                        itemLayout="horizontal"
                        size="large"
                        style={{padding: 8}}
                        dataSource={this.props.location.items&&this.props.location.items.hits}
                        renderItem={(item,key) => <ListItem {...this.props} item={item} key={item.ToiletID} keyId={key} />}
                    />:
                    <Card style={{borderRadius: 0}} bodyStyle={{height: "60px", padding: "0em 1em", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <span>Well shit... Your search didn't give any results. <a onClick={e => this.props.dispatch(fetchClosestItems(this.props.location.location))}>Find closest.</a></span>
                    </Card>
                    }
                </Card>}
            </div>
        :null
        )

    }
}

class ListItem extends Component {
    componentDidMount(){
        if(!this.props.review.ratings.ToiletID){
            this.props.dispatch(getRating({toiletId: this.props.item.ToiletID}))
        }
    }

    render() {
        return (
            <List.Item
                key={this.props.item.ToiletID}
                onClick = {e => this.props.dispatch(selectItemOnMap(this.props.keyId))}
                style={{cursor: "pointer"}}
            >
                <List.Item.Meta
                    avatar={this.props.review.ratings[this.props.item.ToiletID]?(<Avatar style={{verticalAlign: 'middle' }} shape="square">{(this.props.review.ratings[this.props.item.ToiletID]&&this.props.review.ratings[this.props.item.ToiletID].countTotal>0)?`${this.props.review.ratings[this.props.item.ToiletID].rating}%`:`-`}</Avatar>):<Avatar style={{verticalAlign: 'middle' }} size="large" icon="loading" shape="square"/>}
                    title={<span style={{}}>{(this.props.review.ratings[this.props.item.ToiletID]&&this.props.review.ratings[this.props.item.ToiletID].rating>80)?<Icon type="safety" style={{marginRight: "0.5em"}}/>:null}{this.props.item.Name}</span>}
                    description={<span style={{}}>{this.props.item.AddressNote}</span>}
                    />
                    {Math.round(calculateDistanceTo(this.props.location.location, this.props.item._geoloc))+"m away"}
            </List.Item>
        )
    }
}

export default connect((store) => {
    return {
      display: store.display,
      location: store.location,
      review: store.review
    }
  })(SideBar)


 