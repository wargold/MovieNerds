import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getMovieByMovieID, getTrailerByMovieID, getCastByMovieID} from '../actions';
import {Image} from 'react-bootstrap';
import {LOADING_SPINNER} from '../constants/constants';
import MovieInfo from '../components/movieInfo';
import SearchBar from './searchBar'
import MovieGenreList from './movieGenreList'
import MoviesByGenres from './moviesByGenres'

class Main extends Component {

    render() {
        return (<div>
            <SearchBar/>
            {this.props.selector.value.length > 0 ?
                <MoviesByGenres/>
                :
                <MovieGenreList/>
            }
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        selector: state.selections
    };
}


export default connect(mapStateToProps)(Main);