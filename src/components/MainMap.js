import React, { Component } from 'react'
import { compose, withProps, withHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps"
import { Icon } from 'antd'

import { connect } from "react-redux"
import { setLocation, isDraggingArea, isDraggingPoint, selectItemOnMap, fetchItems } from './../actions/locationActions'
import { toggleSideBar, setMapFullScreen, disableMapFullScreen } from './../actions/displayActions'


const mapStyle = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]
const lightMapStyle = [
  {
      "featureType": "landscape",
      "stylers": [
          {
              "hue": "#FFBB00"
          },
          {
              "saturation": 43.400000000000006
          },
          {
              "lightness": 37.599999999999994
          },
          {
              "gamma": 1
          }
      ]
  },
  {
      "featureType": "road.highway",
      "stylers": [
          {
              "hue": "#FFC200"
          },
          {
              "saturation": -61.8
          },
          {
              "lightness": 45.599999999999994
          },
          {
              "gamma": 1
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "stylers": [
          {
              "hue": "#FF0300"
          },
          {
              "saturation": -100
          },
          {
              "lightness": 51.19999999999999
          },
          {
              "gamma": 1
          }
      ]
  },
  {
      "featureType": "road.local",
      "stylers": [
          {
              "hue": "#FF0300"
          },
          {
              "saturation": -100
          },
          {
              "lightness": 52
          },
          {
              "gamma": 1
          }
      ]
  },
  {
      "featureType": "water",
      "stylers": [
          {
              "hue": "#0078FF"
          },
          {
              "saturation": -13.200000000000003
          },
          {
              "lightness": 2.4000000000000057
          },
          {
              "gamma": 1
          }
      ]
  }
]

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDGhoMHclnf20_-iTRhjYaIwfYKjYazbQU&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: (window.innerHeight), background: "#144B53", display: "flex", justifyContent: "center", alignItems: "center" }}><Icon type="loading" style={{fontSize: "6em",color: "white"}}/></div>,
    containerElement: <div style={{ height: (window.innerHeight), background: "#144B53", position: "sticky" }} />,
    mapElement: <div style={{ height: `100%`, background: "#144B53"  }} />,
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
      },
      getCenter: () => () => refs.map.getCenter()
    }
  }),
  withScriptjs,
  withGoogleMap)(
      class MapComponent extends Component {
        state = {
          center: this.props.location&&this.props.location.location?this.props.location.location:{ lat: -35.282, lng: 149.129 },
          lightTheme: false
        }
        
        componentWillReceiveProps(nextProps){
            if(nextProps.location.location !== this.props.location.location){
                this.props.panTo(nextProps.location.location)
                this.props.dispatch(fetchItems(nextProps.location.location,this.props.location.urgency.distance))
            }
            if(nextProps.display.lightTheme !== this.state.lightTheme){
              this.setState({
                lightTheme: nextProps.display.lightTheme
              })
            }
        }

        render() {
          return (
            <GoogleMap
                defaultZoom={this.props.display.width>680?16:15}
                key={`${this.props.display.height}${this.state.lightTheme?'light-map':'dark-map'}`}
                defaultCenter={{ lat: -35.282, lng: 149.129 }}
                center={this.props.location&&this.props.location.location?this.props.location.location:{ lat: -35.282, lng: 149.129 }}
                defaultOptions={{
                    styles: this.state.lightTheme?lightMapStyle:mapStyle,
                    backgroundColor: "#144B53",
                    clickableIcons: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                    zoomControl: false,
                    gestureHandling: "greedy"
                }}
                onDragStart={e => this.props.dispatch(isDraggingArea())} 
                onDragEnd={e => {
                  this.props.dispatch(setLocation({lat: this.props.getCenter().lat(), lng: this.props.getCenter().lng()} ))}
                } 
                onCenterChanged={() => this.setState({center: this.props.getCenter()}) }
                onClick={e => {
                  this.props.dispatch(setMapFullScreen())
                }}
                ref={e => {this.props.onMapMounted(e);}}
            >
                <Circle 
                    visible={this.props.location.showArea} 
                    draggable={false} 
                    onDragStart={e => this.props.dispatch(isDraggingArea())} 
                    onDragEnd={e => {
                      this.props.dispatch(setLocation(e.latLng.toJSON()))
                      this.props.dispatch(fetchItems(e.latLng.toJSON(),this.props.location.urgency.distance))
                    }} 
                    onClick={e => {
                      this.props.dispatch(setMapFullScreen())
                    }}
                    center={ this.state&&this.state.center } 
                    radius = {this.props.location.urgency.distance} 
                    options={{fillOpacity:0.2,fillColor:!this.props.location.areaIsDragging?"#1a9ed9":"#49CE75",strokeColor:!this.props.location.areaIsDragging?"#1a9ed9":"#49CE75"}}
                    />
                <Marker 
                    visible={this.props.location.showPoint} 
                    draggable={false} 
                    onDragStart={e => this.props.dispatch(isDraggingPoint())} 
                    onDragEnd={e => {
                      this.props.dispatch(setLocation(e.latLng.toJSON()))
                      this.props.dispatch(fetchItems(e.latLng.toJSON(),this.props.location.urgency.distance))
                    }} 
                    onClick={e => {
                      this.props.dispatch(setMapFullScreen())
                    }}
                    position={ this.state&&this.state.center }/>
                    
                
                {this.props.location.items&&this.props.location.items.hits.map((item, key) =>
                    <Marker 
                        position={{lat:item._geoloc.lat,lng:item._geoloc.lng}}
                        key={item.ToiletID}
                        onClick={e => {
                          this.props.dispatch(selectItemOnMap(key)) 
                          this.props.dispatch(toggleSideBar(true))
                          this.props.dispatch(disableMapFullScreen())
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
      map: store.map,
      display: store.display
    }
  })(MyMapComponent)