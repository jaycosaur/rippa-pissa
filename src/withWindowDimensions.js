import React, { Component } from 'react'
import { updateDeviceDimensions } from './actions/displayActions'

export default (WrappedComponent) => {
    return class WindowDimensions extends Component {
        resize = (event) => {
            const dimObj = {
                width: event.target.innerWidth,
                height: event.target.innerHeight
            }
            this.props.dispatch(updateDeviceDimensions(dimObj))
        }
        componentDidMount() {
            window.addEventListener('resize', this.resize)
            const dimObj = {
                width: window.innerWidth,
                height: window.innerHeight-64
            }
            this.props.dispatch(updateDeviceDimensions(dimObj))
        }
          componentWillUnmount() {
            window.removeEventListener('resize', this.resize)
          }
        render() {
            return (
                <WrappedComponent {...this.props} />
            )
        }
      }
}