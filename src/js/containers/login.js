import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Toaster, Intent} from '@blueprintjs/core';
import {setAuthenticated} from '../actions';
import {app, facebookProvider, database} from '../constants/base';
import './css/login.css';
import Modal from 'react-responsive-modal';
import {Glyphicon, Button} from 'react-bootstrap'

class Login extends Component {

    state = {
        open: false,
    };

    onOpenModal = () => {
        this.setState({open: true});
    };

    onCloseModal = () => {
        this.setState({open: false});
    };

    constructor(props) {
        super(props);
        this.authWithFacebook = this.authWithFacebook.bind(this);
        this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
    }

    saveUser(id, email) {
        database.ref('users/' + id)
            .set({
                email: email,
            });
    }

    authWithFacebook() {
        console.log('facebook auth');
        app.auth()
            .signInWithPopup(facebookProvider)
            .then((result, error) => {
                if (error) {
                    this.toaster.show({intent: Intent.DANGER, message: 'Facebook signin failed'});
                } else {
                    // Successfully signed in with facebook
                    //this.setState({ redirect: true })
                    this.onCloseModal();
                    console.log(result.user);
                    this.props.setAuthenticated(result.user.displayName);

                    //this.saveUser(result.user.uid, result.user.email)
                }
            });

    }

    authWithEmailPassword(event) {
        event.preventDefault();

        const email = this.emailInput.value;
        const password = this.passwordInput.value;

        app.auth()
            .fetchProvidersForEmail(email)
            .then((providers) => {
                if (providers.length === 0) {
                    // create user
                    console.log('create');
                    return app.auth()
                        .createUserWithEmailAndPassword(email, password);

                } else if (providers.indexOf('password') === -1) {
                    // they used facebook
                    console.log('already facebook');
                    //this.toaster.show({ intent: Intent.WARNING, message: "Try alternative login." })
                } else {
                    // sign user in
                    console.log('success login');
                    return app.auth()
                        .signInWithEmailAndPassword(email, password)
                        .catch(error => this.toaster.show({intent: Intent.DANGER, message: error.message}));
                }
            })
            .then((user) => {
                if (user && user.email) {
                    //this.props.setCurrentUser(user)
                    //this.setState({ redirect: true })
                    console.log(user);
                    this.props.setAuthenticated(user.email);

                    //this.saveUser(user.uid, user.email)
                }
            })
            .catch((error) => {
                this.toaster.show({intent: Intent.DANGER, message: error.message});
            });
    }

    render() {
        const {open} = this.state;

        return (
            <div className="example">

                <Button onClick={this.onOpenModal}>
                    <Glyphicon glyph="user"/> Login/Register
                </Button>
                <Modal
                    open={open}
                    onClose={this.onCloseModal}
                    center
                    classNames={{
                        transitionEnter: 'transition-enter',
                        transitionEnterActive: 'transition-enter-active',
                        transitionExit: 'transition-exit-active',
                        transitionExitActive: 'transition-exit-active',
                    }}
                    animationDuration={1000}
                >
                    <div>
                        <Toaster ref={(element) => {
                            this.toaster = element;
                        }}/>
                        <h2 id="signin">Sign in</h2>
                        <hr style={{marginTop: '33px', marginBottom: '10px'}}/>
                        <form onSubmit={(event) => {
                            this.authWithEmailPassword(event);
                        }} ref={(form) => {
                            this.loginForm = form;
                        }}>
                            <div style={{marginBottom: '10px'}} className="pt-callout pt-icon-info-sign">
                                <h5>Note</h5>
                                If you don't have an account already, this form will create your account.
                            </div>
                            <label className="pt-label">
                                <div className="pt-Name">Email</div>
                                <input style={{width: '100%'}} className="pt-input" name="email" type="email"
                                       ref={(input) => {
                                           this.emailInput = input;
                                       }} placeholder="Email"></input>
                            </label>
                            <label className="pt-label">
                                <div className="pt-Name">Password</div>
                                <input style={{width: '100%'}} className="pt-input" name="password" type="password"
                                       ref={(input) => {
                                           this.passwordInput = input;
                                       }} placeholder="Password"></input>
                            </label>
                            <input style={{width: '100%', textAlign: 'center'}} type="submit"
                                   className="pt-button pt-intent-primary" value="Log In / Register"></input>
                        </form>
                        <hr style={{marginTop: '10px', marginBottom: '10px'}}/>
                        <button style={{width: '100%', background: '#3B5998'}} className="pt-button pt-intent-primary"
                                id="facebookButton" onClick={() => {
                            this.authWithFacebook();
                        }}>
                            <svg className="facebooklogo" xmlns="http://www.w3.org/2000/svg" width="25px" height="25px"
                                 viewBox="0 0 266.893 266.895">
                                <path id="background" fill="#FFFFFF"
                                      d="M248.082,262.307c7.854,0,14.223-6.369,14.223-14.225V18.812
                               c0-7.857-6.368-14.224-14.223-14.224H18.812c-7.857,0-14.224,6.367-14.224,14.224v229.27c0,
                               7.855,6.366,14.225,14.224,14.225  H248.082z"/>
                                <path id="f" fill="#3B5998"
                                      d="M182.409,262.307v-99.803h33.499l5.016-38.895h-38.515V98.777c0-11.261,3.127-18.935,
                              19.275-18.935  l20.596-0.009V45.045c-3.562-0.474-15.788-1.533-30.012-1.533c-29.695,
                              0-50.025,18.126-50.025,51.413v28.684h-33.585v38.895h33.585  v99.803H182.409z"/>
                            </svg>
                            Log In with Facebook
                        </button>
                    </div>
                </Modal>
            </div>
        );
    }


}

// Import actions that the view uses to update the store
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setAuthenticated: setAuthenticated,
    }, dispatch);
}

// Access data from the store
function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        redirect: state.auth.redirect,
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);
