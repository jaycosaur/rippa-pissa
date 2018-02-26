import React, { Component } from 'react'
import { compose, withProps, withHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Circle, Icon } from "react-google-maps"

import { connect } from "react-redux"
import { setLocation, isDraggingArea, isDraggingPoint } from './../actions/locationActions'

import sampleData from './../sampleDataJSON'

const mapStyle = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]


const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDGhoMHclnf20_-iTRhjYaIwfYKjYazbQU&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: (window.innerHeight-64)  }} />,
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
                onClick={e => {this.props.dispatch(setLocation(e.latLng.toJSON()))}}
                ref={e => {this.props.onMapMounted(e);}}
            >
                <Circle 
                    visible={this.props.location.showArea} 
                    draggable={true} 
                    onDragStart={e => this.props.dispatch(isDraggingArea())} 
                    onDragEnd={e => this.props.dispatch(setLocation(e.latLng.toJSON()))} 
                    center={ this.props.location.location } 
                    radius = {1000} 
                    options={{fillColor:!this.props.location.areaIsDragging?"#1a9ed9":"#fff"}}
                    />
                <Marker 
                    visible={this.props.location.showPoint} 
                    draggable={true} 
                    onDragStart={e => this.props.dispatch(isDraggingPoint())} 
                    onDragEnd={e => this.props.dispatch(setLocation(e.latLng.toJSON()))} 
                    position={ this.props.location.location } />
                {sampleData.map((item, key) =>
                    <Marker 
                        position={{lat:item["Latitude"],lng:item["Longitude"]}} 
                        icon={
                            <Icon
                                url="http://webiconspng.com/wp-content/uploads/2017/09/Toilet-Paper-PNG-Image-22674.png"
                                point = {{x:24, y:24}}
                                scaledSize= {{x:24, y:24}}
                            />}
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