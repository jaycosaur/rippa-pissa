import React, { Component } from 'react';

import { connect } from "react-redux"

import { Map, InfoWindow, Marker } from 'google-maps-react';
import { Layout, Icon, Card, Tag } from 'antd';
import AddressSearchBar from './../components/AddressSearchBar'

import { setLocation } from './../actions/locationActions'
const { Content } = Layout;

class MapContainer extends Component {
    constructor(props){
      super(props)
      this.state = {
        selectedLocation: null,
        latlng: {
          lat: -35.2809368,
          lng: 149.1300092
        },
        isSearched: false,
        lastUpdate: Date.now(),
        slider: 10
  
      }
    }
  
    handleLatLngChange = (latlng) => {
      console.log("Search complete.")
      this.setState({
        latlng: latlng,
        isSearched: true,
        lastUpdate: Date.now()
      })
    }
  
    selectLocation = (mapProps, map, clickEvent) => {
      const latlng = {
        lat: clickEvent.latLng.lat(),
        lng: clickEvent.latLng.lng() 
      }
     this.props.dispatch(setLocation(latlng))
    }
  
    render() {
        //const w = window.innerWidth
        const h = window.innerHeight - 64
        const mapStyles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]
        return (
            <Content style={{minHeight: h}}>
              <Card bordered={false} bodyStyle={{padding: 0, height: h}}>
                {this.props.location.location&&
                <Map 
                  google={this.props.google}
                  key={this.state.lastUpdate}
                  styles={mapStyles}
                  zoom={14}
                  onClick={this.selectLocation}
                  initialCenter={this.props.location.location}
                  onReady={e => console.log('Map Ready to fetch')}
                  onDragend={e => console.log(e)}
                  >
                  {this.state.latlng&&
                  <Marker
                    title={'Selected region for solar predictions.'}
                    name={'Selected Location'}
                    position={this.props.location.location}
                    onClick={e => console.log("You clicked the roll!")}
                    icon={{
                      url: "http://webiconspng.com/wp-content/uploads/2017/09/Toilet-Paper-PNG-Image-22674.png",
                      anchor: new this.props.google.maps.Point(24,24),
                      scaledSize: new this.props.google.maps.Size(48,48)
                    }} />}
                  
                  <InfoWindow onClose={this.onInfoWindowClose}>
                  </InfoWindow>
                </Map>}
              </Card>
              {this.state.selectedLocation&&<Card bordered={false} >
                  <Tag size="large"><Icon type="global" />{` Latitude: ${this.state.selectedLocation&&this.state.selectedLocation.lat}`}</Tag>
                  <Tag size="large"><Icon type="global" />{` Longitude: ${this.state.selectedLocation&&this.state.selectedLocation.lng}`}</Tag>
              </Card>}
            </Content>
        );
      }
    }

    export default connect((store) => {
      return {
        location: store.location,
        map: store.map
      }
    })(MapContainer)