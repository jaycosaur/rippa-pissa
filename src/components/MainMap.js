import React, { Component } from 'react'
import { compose, withProps, withHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps"

import { connect } from "react-redux"
import { setLocation, isDraggingArea, isDraggingPoint, selectItemOnMap, fetchItems } from './../actions/locationActions'
import { toggleSideBar } from './../actions/displayActions'


const mapStyle = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]


const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDGhoMHclnf20_-iTRhjYaIwfYKjYazbQU&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: (window.innerHeight), }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withHandlers(() => {
    const refs = {
      map: undefined,
    }
    return {
      onMapMounted: () => ref => {
        refs.map = ref
      },
      panTo: () => (latLng) => {
        refs.map.panTo(latLng)
      }
    }
  }),
  withScriptjs,
  withGoogleMap)(
      class MapComponent extends Component {
        componentWillReceiveProps(nextProps){
            if(nextProps.location.location !== this.props.location.location){
                this.props.panTo(nextProps.location.location)
            }
        }
        render() {
          return (
            <GoogleMap
                defaultZoom={14}
                defaultCenter={{ lat: -35.282, lng: 149.129 }}
                defaultOptions={{
                    styles: mapStyle,
                    clickableIcons: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullScreenControl: false,
                    zoomControl: false
                }}
                onClick={e => {
                  this.props.dispatch(setLocation(e.latLng.toJSON()))
                  this.props.dispatch(fetchItems(e.latLng.toJSON(),this.props.location.urgency.distance ))
                }}
                ref={e => {this.props.onMapMounted(e);}}
            >
                <Circle 
                    visible={this.props.location.showArea} 
                    draggable={true} 
                    onDragStart={e => this.props.dispatch(isDraggingArea())} 
                    onDragEnd={e => {
                      this.props.dispatch(setLocation(e.latLng.toJSON()))
                      this.props.dispatch(fetchItems(e.latLng.toJSON(),this.props.location.urgency.distance))
                    }} 
                    center={ this.props.location.location } 
                    radius = {this.props.location.urgency.distance} 
                    options={{fillColor:!this.props.location.areaIsDragging?"#1a9ed9":"#fff"}}
                    />
                <Marker 
                    visible={this.props.location.showPoint} 
                    draggable={true} 
                    onDragStart={e => this.props.dispatch(isDraggingPoint())} 
                    onDragEnd={e => {
                      this.props.dispatch(setLocation(e.latLng.toJSON()))
                      this.props.dispatch(fetchItems(e.latLng.toJSON(),this.props.location.urgency.distance))
                    }} 
                    position={ this.props.location.location } />
                
                {this.props.location.items&&this.props.location.items.hits.map((item, key) =>
                    <Marker 
                        position={{lat:item._geoloc.lat,lng:item._geoloc.lng}}
                        key={item.ToiletID}
                        onClick={e => {
                          this.props.dispatch(selectItemOnMap(key)) 
                          this.props.dispatch((toggleSideBar(true)))
                        }}
                        icon={`http://maps.google.com/mapfiles/ms/micons/${this.props.location.selectedItem&&(this.props.location.selectedItem.info.ToiletID===item.ToiletID)?"green-dot":"toilets"}.png`}
                        />)
                }
            </GoogleMap>
          )
        }
      }
)

export default connect((store) => {
    return {
      location: store.location,
      map: store.map
    }
  })(MyMapComponent)