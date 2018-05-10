import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NavBarHeader from './navbar';
import MovieGenreList from './movieGenreList'
import {app} from '../constants/base';
import {setAuthenticated, notLoggedIn} from '../actions';
import {Spinner} from '@blueprintjs/core';

class Main extends Component {
    componentDidMount() {
        this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("logged in", user.displayName)
                if (user.displayName === null) {
                    this.props.setAuthenticated(user.email);
                } else {
                    this.props.setAuthenticated(user.displayName);
                }

            } else {
                console.log("not logged in")
                this.props.notLoggedIn();
            }
        })
    }

    componentWillUnmount() {
        this.removeAuthListener();
    }

    render() {
        if (this.props.loading) {
            return (
                <div style={{textAlign: "center", position: "absolute", top: "25%", left: "50%"}}>
                    <h3>Loading</h3>
                    <Spinner/>
                </div>
            )
        }

        return (

            <div>
                <NavBarHeader/>
                <MovieGenreList/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loading: state.auth.loading
    };
}

// Import actions that the view uses to update the store
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setAuthenticated: setAuthenticated,
        notLoggedIn: notLoggedIn
    }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(Main);
