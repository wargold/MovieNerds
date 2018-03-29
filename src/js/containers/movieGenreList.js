import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { getMovieGenres } from '../actions';

class MovieGenreList extends Component {

    componentWillMount() {
        this.props.getMovieGenres();
    }

    getGenresName=()=>{
        if(this.props.genres.length>0) {
            let genre = this.props.genres.map((elem) => <li key={elem.id}>{elem.name}</li>);
            return genre
        }else return "Hej"
    }

    render() {
        console.log(this.props.genres.length)
        return(
            <div>{this.getGenresName()}</div>
        );
    }
}

function mapStateToProps(state){
    return {
        genres: state.genres.genres
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({getMovieGenres: getMovieGenres}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(MovieGenreList);