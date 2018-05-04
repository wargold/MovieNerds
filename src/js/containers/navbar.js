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

        let loggin = this.props.authenticated ? (
            <div className="dropdown">
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
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Brand>{loggin}</Navbar.Brand>
                </Navbar.Header>
                    <Navbar.Form pullLeft>
                        <FormGroup className="search">
                            <SearchByGenres/>
                        </FormGroup>{' '}
                <FormGroup className="search">
                            <SearchBar/>
                        </FormGroup>
                </Navbar.Form>
            </Navbar>
        );
    }
}

function mapStateToProps(state) {
    return {
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
