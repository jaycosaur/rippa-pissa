import React, { Component } from 'react'
import { Input, Form } from 'antd';
import { setLocation } from './../actions/locationActions'
import { connect } from "react-redux"

const googleMapsClient = require('@google/maps').createClient({
    key: "AIzaSyDGhoMHclnf20_-iTRhjYaIwfYKjYazbQU",
    Promise: Promise
  });


class AddressSearchBar extends Component {
    constructor(props){
      super(props)
      this.state = {
        isFetching: false,
        result: null,
        formValue: "",
        latlng: null,
        formattedAddress: null
      }
    }
  
    handleChange = (e) => {
      this.setState({
        formValue: e.target.value
      })
    }
  
    onButtonClick = (e) => {
      e.preventDefault()
      this.fetchAddress()
    }
  
    fetchAddress = async () => {
      this.setState({
        isFetching: true
      })
      await googleMapsClient.geocode({address: this.state.formValue}).asPromise()
        .then((response) => {
          this.setState({
            latlng: response.json.results[0].geometry.location,
            formattedAddress: response.json.results[0].formatted_address,
            formValue: response.json.results[0].formatted_address
          })
          this.props.dispatch(setLocation(response.json.results[0].geometry.location))
        })
        .catch((err) => {
          console.log(err);
        })
      this.setState({
          isFetching: false
      })
    }
  
    render(){
      return (
          <Form onSubmit={this.onButtonClick} style={{width: "100%"}}>
            <Input.Search 
              size="large" 
              autoFocus
              placeholder="Enter an address" 
              onSearch={e => this.fetchAddress()} 
              enterButton={this.state.formValue&&true}
              onChange={this.handleChange} 
              value={this.state.formValue}/>
          </Form>
      )
    }
  }

  export default connect((store) => {
    return {
      location: store.location
    }
  })(AddressSearchBar)