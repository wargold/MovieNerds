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
import { app, base } from '../base';
import { setAuthenticated } from '../actions';

class Main extends Component {
    componentWillMount() {
        this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("logged in")
                this.props.setAuthenticated(user);
            } else {
                console.log("not logged in")
            }
        })
    }

    componentWillUnmount() {
        this.removeAuthListener();
    }

    render() {
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
        selector: state.selections
    };
}

// Import actions that the view uses to update the store
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setAuthenticated: setAuthenticated
    }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(Main);