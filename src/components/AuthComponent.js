import { Authenticator, SignIn, SignUp, ConfirmSignUp, Greetings } from 'aws-amplify-react';

import React, { Component } from 'react'

const AlwaysOn = (props) => {
    return (
        <div>
            <div>I am always here to show current auth state: {props.authState}</div>
            <button onClick={() => props.onStateChange('signUp')}>Show Sign Up</button>
        </div>
    )
}

export default class componentName extends Component {
    
    
    handleAuthStateChange(state) {
        if (state === 'signedIn') {
            /* Do something when the user has signed-in */
        }
    }
    
    render() {
        return (
            <Authenticator hideDefault={true} onStateChange={this.handleAuthStateChange}>
                <SignIn/>
                <SignUp/>
                <ConfirmSignUp/>
                <Greetings/>
                <AlwaysOn/>
            </Authenticator>
        )
    }
}


