import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getMovieGenres, getMoviesByGenre, updateAllMoviesGenres} from '../actions';
import SimpleSlider from "../components/genreSlider";

class MovieGenreList extends Component {

    async componentWillMount() {
        let arr = [];
        let pro = [];
        Promise.all([this.props.getMovieGenres()]).then((res) => {
            res[0].data.map((elem) => {
                return (this.props.getMoviesByGenre(elem.id)).then(() => {
                    arr.push(elem);
                    pro.push(this.props.movies);
                }).catch((err) => {
                    console.error(err)
                })
            });
        }).catch((err) => {
            console.error(err)
        });
        await this.props.updateAllMoviesGenres(arr, pro);
    }

    render() {
        const de = (this.props.updateMoviesByGenre.genres[0]!==undefined && this.props.updateMoviesByGenre.movies[0]!== undefined && this.props.updateMoviesByGenre.genres[0].length > 0 && this.props.updateMoviesByGenre.movies[0].length > 0) ?
            (<SimpleSlider genres={this.props.updateMoviesByGenre.genres[0]} movies={this.props.updateMoviesByGenre.movies[0]}/>)
            : (
                <h2>{"Hej och laddning"}</h2>
            )
        return (<div>{de}</div>)
    }
}

function mapStateToProps(state) {
    return {
        genres: state.genres.genres,
        movies: state.movies,
        updateMoviesByGenre: state.updateMoviesByGenre
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getMovieGenres: getMovieGenres,
        getMoviesByGenre: getMoviesByGenre,
        updateAllMoviesGenres: updateAllMoviesGenres
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MovieGenreList);