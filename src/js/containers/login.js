import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { Toaster, Intent} from '@blueprintjs/core'

import { app, facebookProvider } from '../base'

const loginStyles = {
    width: "90%",
    maxWidth: "315px",
    margin: "20px auto",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px"
}

class Login extends Component {

    constructor(props) {
        super(props)
        this.authWithFacebook = this.authWithFacebook.bind(this)
        this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
        this.state = {
            redirect: false
        }
    }

    authWithFacebook() {
        console.log("facebook auth")
        app.auth().signInWithPopup(facebookProvider)
            .then((result, error) => {
                if (error) {
                    this.toaster.show({ intent: Intent.DANGER, message: "Facebook signin failed" })
                } else {
                    this.setState({ redirect: true })
                }
            })

    }

    authWithEmailPassword(event) {
        event.preventDefault()
        console.log("email auth")
        console.table([{
            email: this.emailInput.value,
            password: this.passwordInput.value
        }])
    }

    render() {

    
        if (this.state.redirect === true) {
            return <Redirect to={'/'} />
        }

        return (
            <div style={loginStyles}>
                <Toaster ref={(element) => { this.toaster = element }} />
                <button style={{ width: "100%" }} className="pt-button pt-intent-primary" onClick={() => { this.authWithFacebook() }}>Log In with Facebook</button>
                <hr style={{ marginTop: "10px", marginBottom: "10px" }} />
                <form onSubmit={(event) => { this.authWithEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
                    <div style={{ marginBottom: "10px" }} className="pt-callout pt-icon-info-sign">
                        <h5>Note</h5>
                        If you don't have an account already, this form will create your account.
          </div>
                    <label className="pt-label">
                        Email
            <input style={{ width: "100%" }} className="pt-input" name="email" type="email" ref={(input) => { this.emailInput = input }} placeholder="Email"></input>
                    </label>
                    <label className="pt-label">
                        Password
            <input style={{ width: "100%" }} className="pt-input" name="password" type="password" ref={(input) => { this.passwordInput = input }} placeholder="Password"></input>
                    </label>
                    <input style={{ width: "100%" }} type="submit" className="pt-button pt-intent-primary" value="Log In"></input>
                </form>
            </div>

        );
    }


}

export default connect()(Login);