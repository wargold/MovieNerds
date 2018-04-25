import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getMovieGenres, getMoviesByGenre, updateAllMoviesGenres, getMostPopMovies, getLoadedAllMoviesSucces, resetSelectedValues} from '../actions';
import SimpleSlider from "../components/genreSlider";
import MostPopularSlide from "../components/mostPopularSlide";
import {Loader} from '../../loader/loader';

class MovieGenreList extends Component {

    componentDidMount() {
        this.props.resetGenreValue();
        if (this.props.allMoviegenres.isFetching) {
            this.props.getLoadedAllMoviesSucces();
            setTimeout(() =>{
                this.props.getPopularMovies();
            }, 3500);
        }
    }

    render() {
        let mostPopMovies= this.props.mostPopMovies.movies;
        console.log("mostPopMovies",mostPopMovies);
        const de = !this.props.allMoviegenres.isFetching && mostPopMovies!==undefined&& mostPopMovies.length>0?
            (<div className="sliderBackground">
                <MostPopularSlide mostPopular={mostPopMovies}/>
                <SimpleSlider movies={this.props.allMoviegenres.moviesByGenres[0]}/>
            </div>)
            : (Loader()
            );
        return (<div>{de}</div>)
    }
}

function mapStateToProps(state) {
    return {
        genres: state.genres.genres,
        movies: state.movies,
        updateMoviesByGenre: state.updateMoviesByGenre,
        mostPopMovies: state.mostPopularMovies,
        allMoviegenres: state.allMoviegenres
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getMovieGenres: getMovieGenres,
        getMoviesByGenre: getMoviesByGenre,
        updateAllMoviesGenres: updateAllMoviesGenres,
        getPopularMovies: getMostPopMovies,
        getLoadedAllMoviesSucces: getLoadedAllMoviesSucces,
        resetGenreValue: resetSelectedValues
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MovieGenreList);