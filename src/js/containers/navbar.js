import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './css/navbar.css';
import {Navbar, FormGroup, Button, Glyphicon, NavDropdown, MenuItem} from 'react-bootstrap';
import {setAuthenticated, notLoggedIn} from '../actions';
import {Link} from 'react-router-dom';
import {app} from '../constants/base';
import SearchByGenres from './selectGenre';
import SearchBar from './searchBar'
import Login from './login';
import history from '../history';
import {Toaster, Intent, Position} from '@blueprintjs/core';
import PopUpFavPageInfo from '../components/PopUpPageInfo';

class NavBarHeader extends Component {


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
        console.log('aseewf', this.props.authenticated);

        var userButton = {
            position: 'absolute',
            right: '20px'
        }

        let loggin = this.props.authenticated ? (
            <div className="dropdown" style={userButton}>
                <NavDropdown eventKey={3} title={<span><Glyphicon glyph="user"/> {this.props.user}</span>}
                             id="basic-nav-dropdown">
                    <MenuItem eventKey={3.2} onClick={() => history.push('/myfavorites')}>
                        <Glyphicon glyph="heart"/> My Favorites</MenuItem>
                    <MenuItem eventKey={3.2} onClick={() => history.push('/logout')}>
                        <Glyphicon glyph="log-out"/> Log Out</MenuItem>
                </NavDropdown>
            </div>
        ) : (
            <div>
                <Login/>
            </div>

        );

        return (
            <Navbar inverse collapseOnSelect navbar-fixed-top fluid={true}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to={'/'}>
                            <a id="movietitle" href="#home">Movie Nerds</a>
                            {this.props.auth.user !== '' ?
                                <PopUpFavPageInfo
                                    username={this.props.auth.user} whatPage={"firstLoginPage"}/> : null}
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Brand className="logginButt">{loggin}</Navbar.Brand>
                    {!navigator.onLine ? OurToaster.show({
                        message: "Please Check Your Internet Connection!",
                        intent: Intent.WARNING
                    }) : <h2/>}
                </Navbar.Header>
                <Navbar.Form pullLeft>
                    <FormGroup className="search">
                        <SearchByGenres/>
                    </FormGroup>{' '}
                    <FormGroup className="searchMovieTitle">
                        <SearchBar/>
                    </FormGroup>
                </Navbar.Form>
            </Navbar>
        );
    }
}

const OurToaster = Toaster.create({
    className: "my-toaster",
    position: Position.TOP,
});

function mapStateToProps(state) {
    return {
        auth: state.auth,
        getse: state.search,
        selector: state.selections,
        authenticated: state.auth.authenticated,
        user: state.auth.user,
        loading: state.auth.loading,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setAuthenticated: setAuthenticated,
        notLoggedIn: notLoggedIn
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(NavBarHeader);
