import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getMovieGenres, getMoviesByGenre, updateAllMoviesGenres, getMostPopMovies} from '../actions';
import SimpleSlider from "../components/genreSlider";
import {Image} from 'react-bootstrap';
import {LOADING_SPINNER} from '../constants/constants'
import MostPopularSlide from "../components/mostPopularSlide"

let len;
class MovieGenreList extends Component {

    componentDidMount() {
        if (this.props.updateMoviesByGenre.genres[0] === undefined || this.props.updateMoviesByGenre.movies[0] === undefined
            && !(this.props.updateMoviesByGenre.genres[0].length > 0) ||
            !(this.props.updateMoviesByGenre.movies[0].length > 0)) { //Dont Fetch data if data already exist!
            let arr = [];
            let pro = [];
            this.props.getPopularMovies();
            this.loadData().then((data) => {
                data.data.map((elem) => {
                    return (this.loadData2(elem.id)).then(() => {
                        arr.push(elem);
                        pro.push(this.props.movies);
                    })
                })
            });
            this.props.updateAllMoviesGenres(arr, pro);
        }
    }

    loadData() {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.props.getMovieGenres());
            }, 3000);
        });
        return promise;
    }

    loadData2(item) {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.props.getMoviesByGenre(item));
            }, 3000);
        });
        return promise;
    }

    render() {

        const de = this.props.updateMoviesByGenre.genres[0] !== undefined && this.props.updateMoviesByGenre.movies[0] !== undefined
        && this.props.mostPopMovies.movies !== undefined && this.props.updateMoviesByGenre.genres[0].length > 0 &&
        this.props.updateMoviesByGenre.movies[0].length > 0 && this.props.mostPopMovies.movies.length > 0 ?
            (<div>
                <MostPopularSlide mostPopular={this.props.mostPopMovies.movies}/>
                <SimpleSlider genres={this.props.updateMoviesByGenre.genres[0]}
                              movies={this.props.updateMoviesByGenre.movies[0]}/>
            </div>)
            : (
                <Image src={LOADING_SPINNER} style={{width: 100, height: 100}}/>
            );
        return (<div>{de}</div>)
    }
}

function mapStateToProps(state) {
    return {
        genres: state.genres.genres,
        movies: state.movies,
        updateMoviesByGenre: state.updateMoviesByGenre,
        mostPopMovies: state.mostPopularMovies
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getMovieGenres: getMovieGenres,
        getMoviesByGenre: getMoviesByGenre,
        updateAllMoviesGenres: updateAllMoviesGenres,
        getPopularMovies: getMostPopMovies
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MovieGenreList);