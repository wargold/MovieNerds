import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {Spinner} from '@blueprintjs/core'
import {app} from '../constants/base'
import {logout} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Logout extends Component {
    constructor() {
        super()
    }

    componentWillMount() {
        app.auth().signOut().then((user) => {
            this.props.logout();
        })
    }

    render() {
        if (this.props.redirect === true) {
            return <Redirect to="/"/>
        }

        return (
            <div style={{textAlign: "center", position: "absolute", top: "25%", left: "50%"}}>
                <h3>Logging Out</h3>
                <Spinner/>
            </div>
        )
    }
}

// Import actions that the view uses to update the store
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        logout: logout
    }, dispatch);
}

// Access data from the store
function mapStateToProps(state) {
    return {
        redirect: state.auth.redirect
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(Logout);
