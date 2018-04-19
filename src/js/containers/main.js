import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getMovieByMovieID, getTrailerByMovieID, getCastByMovieID } from '../actions';
import { Image } from 'react-bootstrap';
import { LOADING_SPINNER } from '../constants/constants';
import MovieInfo from '../components/movieInfo';
import SearchBar from './searchBar'
import MovieGenreList from './movieGenreList'
import MoviesByGenres from './moviesByGenres'
import Login from './login'
import { app, base } from '../constants/base';
import { setAuthenticated, notLoggedIn } from '../actions';
import { Spinner } from '@blueprintjs/core';

class Main extends Component {
    componentDidMount() {
        this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("logged in", user.displayName)
                if (user.displayName === null) {
                    this.props.setAuthenticated(user.email);
                } else { this.props.setAuthenticated(user.displayName); }

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
                <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
                    <h3>Loading</h3>
                    <Spinner />
                </div>
            )
        }

        return (

            <div>
                <SearchBar />
                {this.props.selector.value.length > 0 ?
                    <MoviesByGenres />
                    :
                    <MovieGenreList />
                }
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        selector: state.selections,
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