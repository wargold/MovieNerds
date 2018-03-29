import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getMovieGenres} from '../actions';
import SimpleSlider from "../components/genreSlider";

class MovieGenreList extends Component {

    componentWillMount() {
        this.props.getMovieGenres();
    }

    render() {
        console.log(this.props.genres.length)
        return (
            <SimpleSlider genres={this.props.genres}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        genres: state.genres.genres
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({getMovieGenres: getMovieGenres}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MovieGenreList);