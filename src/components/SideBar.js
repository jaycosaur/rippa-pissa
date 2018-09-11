import { Layout, Row, List, Avatar, Icon, Card, Dropdown, Menu} from 'antd';
import AddressSearchBar from './../components/AddressSearchBar'
import ItemInformationCard from './../components/ItemInformationCard'
import { connect } from 'react-redux'
import { toggleSideBar } from './../actions/displayActions'
import { selectItemOnMap, fetchClosestItems } from './../actions/locationActions'
import rippaPissaLogo from './../img/rippapissa-logo-dark.svg'
import calculateDistanceTo from './../functions/calculateDistanceTo'
import { getRating } from './../actions/reviewActions'

import React, {Component} from 'react'

const menu = (
    <Menu>
      <Menu.Item key="0">
        <Icon type="login" /><span> Login</span>
      </Menu.Item>
      <Menu.Item key="1">
        <Icon type="user-add" /><span> Signup</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <Icon type="mail" /><span> Contact</span>
      </Menu.Item>
    </Menu>
  );

const MenuIcon = (props) => (
    <Dropdown overlay={menu} trigger={['click']}>
        <Avatar shape="square" size="large" icon="user" style={{cursor: "pointer", background: "white", color:"#49CE75"}}/>
    </Dropdown>
)

const SideBar = (props) => {
    const { selectedItem } = props.location
    return (
        <Layout.Sider
            collapsed={!props.display.showSideBar}
            onCollapse={e => props.dispatch(toggleSideBar())}
            width={400}
            style={{zIndex: 50, overflow: 'auto', height: '100vh', position: 'fixed', left: props.display.showSideBar?0:-400, background: "#E9F4EC"}}
            >
            <Row type="flex" justify="space-between" style={{padding: "1em", background: "#68D18B"}}>
                <MenuIcon/>
                <div style={{marginLeft: "1em", flexGrow: 1}}><AddressSearchBar /></div>
            </Row>
                {props.location.items&&props.location.items.hits.length>0&&!(selectedItem&&selectedItem.showItemInformation)?
                <Card bodyStyle={{padding: "1em"}}><strong><Avatar size="small" icon="like" style={{marginRight: "2em"}}/> {`Found ${props.location.items.hits.length} shittas, ${Object.keys(props.review.ratings).map(i => props.review.ratings[i].rating).filter(i => i>80).length} of 'em ${Object.keys(props.review.ratings).map(i => props.review.ratings[i].rating).filter(i => i>80).length!=1?"are rippas!":"is a rippa!"}`}</strong></Card>
                :null}
                {selectedItem&&selectedItem.showItemInformation
                ?<ItemInformationCard />
                :(props.location.items
                ?(props.location.items.hits.length>0
                ?<List
                    itemLayout="horizontal"
                    size="large"
                    style={{padding: 8}}
                    dataSource={props.location.items&&props.location.items.hits}
                    renderItem={(item,key) => <ListItem {...props} item={item} key={item.ToiletID} keyId={key} />}
                />
                : <Card style={{margin: "1em"}}>
                    <strong>Well shit... Your search didn't give any results.</strong>
                    <br/><br/>I'd widen my search if I were you or you may just have to crap your pants.
                    <br/><br/><strong><a onClick={e => props.dispatch(fetchClosestItems(props.location.location))}>Click here to find the closest toilets to you.</a></strong>
                </Card>
                )
                :
                <React.Fragment>
                    <Card style={{margin: "1em"}}>
                        <strong>Welcome to the Beta Version of RIPPAPISSA!</strong>
                        <br/><br/>We are solving first world problems, one clean crapper at a time.
                        <br/><br/>Have a good crack at it and let us know what's shit.
                        <br/><br/><strong>Cheers, RIPPAPISSA Team</strong>
                    </Card>
                    <Card style={{margin: "1em"}}>
                        <strong>To get started:</strong> Click anywhere on the map, use the location icon, or search for a place above.
                        <br/><br/>Once you have chosen where to search your results will show here.
                    </Card>
                </React.Fragment>
            )}
        </Layout.Sider>
    )
}

class ListItem extends Component {
    componentDidMount(){
        if(!this.props.review.ratings.ToiletID){
            console.log(this.props.item.ToiletID)
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
                    avatar={this.props.review.ratings[this.props.item.ToiletID]?(<Avatar style={{verticalAlign: 'middle' }} size="large" shape="square">{(this.props.review.ratings[this.props.item.ToiletID]&&this.props.review.ratings[this.props.item.ToiletID].countTotal>0)?`${this.props.review.ratings[this.props.item.ToiletID].rating}%`:`-`}</Avatar>):<Avatar style={{verticalAlign: 'middle' }} size="large" icon="loading" shape="square"/>}
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
