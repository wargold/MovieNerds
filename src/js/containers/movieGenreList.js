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
            }, 2000);
        }
    }

    render() {
        console.log("kksd",this.props.mostPopMovies.movies);
        const de = !this.props.allMoviegenres.isFetching && this.props.mostPopMovies.movies!==undefined&& this.props.mostPopMovies.movies.length>0?
            (<div className="sliderBackground">
                <MostPopularSlide mostPopular={this.props.mostPopMovies.movies}/>
                <SimpleSlider genres={this.props.allMoviegenres.genres}
                              movies={this.props.allMoviegenres.moviesByGenres[0]}/>
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