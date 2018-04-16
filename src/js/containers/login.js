import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {Toaster, Intent} from '@blueprintjs/core'
import {setAuthenticated} from '../actions';
import {app, facebookProvider, database} from '../constants/base'

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
    }

    saveUser(id, email) {
        database.ref('users/' + id).set({
            email: email
        });
    }

    authWithFacebook() {
        console.log("facebook auth")
        app.auth().signInWithPopup(facebookProvider)
            .then((result, error) => {
                if (error) {
                    this.toaster.show({intent: Intent.DANGER, message: "Facebook signin failed"})
                } else {
                    // Successfully signed in with facebook
                    //this.setState({ redirect: true })
                    console.log(result.user)
                    this.props.setAuthenticated(result.user.displayName);

                    //this.saveUser(result.user.uid, result.user.email)
                }
            })
    }

    authWithEmailPassword(event) {
        event.preventDefault()

        const email = this.emailInput.value
        const password = this.passwordInput.value

        app.auth().fetchProvidersForEmail(email)
            .then((providers) => {
                if (providers.length === 0) {
                    // create user
                    console.log("create")
                    return app.auth().createUserWithEmailAndPassword(email, password)

                } else if (providers.indexOf("password") === -1) {
                    // they used facebook
                    console.log("already facebook")
                    //this.toaster.show({ intent: Intent.WARNING, message: "Try alternative login." })
                } else {
                    // sign user in
                    console.log("success login")
                    return app.auth().signInWithEmailAndPassword(email, password)
                }
            })
            .then((user) => {
                if (user && user.email) {
                    //this.props.setCurrentUser(user)
                    //this.setState({ redirect: true })
                    console.log(user)
                    this.props.setAuthenticated(user.email)

                    //this.saveUser(user.uid, user.email)
                }
            })
            .catch((error) => {
                this.toaster.show({intent: Intent.DANGER, message: error.message})
            })
    }

    render() {


        if (this.props.redirect === true) {
            return <Redirect to={'/'}/>
        }

        console.log("rendering", this.props.redirect)

        return (
            <div style={loginStyles}>
                <Toaster ref={(element) => {
                    this.toaster = element
                }}/>
                <button style={{width: "100%"}} className="pt-button pt-intent-primary" onClick={() => {
                    this.authWithFacebook()
                }}>Log In with Facebook
                </button>
                <hr style={{marginTop: "10px", marginBottom: "10px"}}/>
                <form onSubmit={(event) => {
                    this.authWithEmailPassword(event)
                }} ref={(form) => {
                    this.loginForm = form
                }}>
                    <div style={{marginBottom: "10px"}} className="pt-callout pt-icon-info-sign">
                        <h5>Note</h5>
                        If you don't have an account already, this form will create your account.
                    </div>
                    <label className="pt-label">
                        Email
                        <input style={{width: "100%"}} className="pt-input" name="email" type="email" ref={(input) => {
                            this.emailInput = input
                        }} placeholder="Email"></input>
                    </label>
                    <label className="pt-label">
                        Password
                        <input style={{width: "100%"}} className="pt-input" name="password" type="password"
                               ref={(input) => {
                                   this.passwordInput = input
                               }} placeholder="Password"></input>
                    </label>
                    <input style={{width: "100%"}} type="submit" className="pt-button pt-intent-primary"
                           value="Log In / Register"></input>
                </form>
            </div>
        );
    }


}

// Import actions that the view uses to update the store
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setAuthenticated: setAuthenticated
    }, dispatch);
}

// Access data from the store
function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        redirect: state.auth.redirect
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);