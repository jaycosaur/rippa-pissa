import { Layout, Row, List, Avatar} from 'antd';
import AddressSearchBar from './../components/AddressSearchBar'
import ItemInformationCard from './../components/ItemInformationCard'
import { connect } from 'react-redux'
import { toggleSideBar } from './../actions/displayActions'
import { selectItemOnMap } from './../actions/locationActions'

import React from 'react'

const SideBar = (props) => {
    const { selectedItem } = props.location
    return (
        <Layout.Sider
            collapsed={!props.display.showSideBar}
            onCollapse={e => props.dispatch(toggleSideBar())}
            width={400}
            style={{zIndex: 50, overflow: 'auto', height: '100vh', position: 'fixed', left: props.display.showSideBar?0:-400, background: "#EFF5EC"}}
            >
            <Row type="flex" justify="space-between" style={{padding: "8px 30px", background: "#87d068"}}>
                <span>RP<Avatar size="large" src="http://webiconspng.com/wp-content/uploads/2017/09/Toilet-Paper-PNG-Image-22674.png"/></span>
                
                <div><AddressSearchBar /></div>
            </Row>
                {selectedItem&&selectedItem.showItemInformation
                ?<ItemInformationCard />
                :<List
                    itemLayout="horizontal"
                    size="large"
                    style={{padding: 8}}
                    dataSource={props.location.items&&props.location.items.hits}
                    renderItem={(item,key) => (
                    <List.Item
                        key={item.ToiletID}
                        onClick = {e => props.dispatch(selectItemOnMap(key))}
                        style={{cursor: "pointer"}}
                    >
                        <List.Item.Meta
                            avatar={<Avatar shape="square" src={item.IconURL} />}
                            title={<span style={{}}>{item.Name}</span>}
                            description={<span style={{}}>{item.AddressNote}</span>}
                            />
                    </List.Item>
                    )}
                />}
        </Layout.Sider>
    )
}

export default connect((store) => {
    return {
      display: store.display,
      location: store.location
    }
  })(SideBar)
