import React from 'react'
import { Icon, Slider } from 'antd'
import { connect } from "react-redux"
import { adjustUrgencyDistance, fetchItems } from './../actions/locationActions'

const UrgencySlider = (props) => {
  const max = 1000
  const min = 50
  const { urgency } = props.location;
  const mid = ((max - min) / 2).toFixed(5);
  const preColor = urgency.distance >= mid ? '' : 'rgba(0, 0, 0, .45)';
  const nextColor = urgency.distance >= mid ? 'rgba(0, 0, 0, .45)' : '';
  const formatter = (value) => {
    if(value <= 50){
      return `URGENT! ${value}m`
    } else if (value <= 200){
      return `Pretty soon. ${value}m`
    } else if (value <= 350){
      return `I can feel something. ${value}m`
    } else if (value <= 500){
      return `It can wait. ${value}m`
    } else if (value <= 750){
      return `I'm up for a walk. ${value}m`
    } else {
      return `Don't even need to go. ${value}m`
    }
  }
  return (
      <Slider 
        tipFormatter={formatter} 
        min={min} 
        max={max} 
        onChange={(value) => props.dispatch(adjustUrgencyDistance(value))} 
        value={urgency.distance}
        onAfterChange={e => props.location.location&&props.dispatch(fetchItems(props.location.location, props.location.urgency.distance))}/>
  );
}

export default connect((store) => {
  return {
    location: store.location
  }
})(UrgencySlider)