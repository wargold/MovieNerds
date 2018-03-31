import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getMovieGenres, getMoviesByGenre, updateAllMoviesGenres} from '../actions';
import SimpleSlider from "../components/genreSlider";

class MovieGenreList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            genres: [],
            moviesByGenre: []
        };
    }

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
        this.setState({genres: arr, moviesByGenre: pro});
    }

    render() {
        const de = (this.state.genres.length > 0 && this.state.moviesByGenre.length > 0) ?
            (<SimpleSlider genres={this.state.genres} movies={this.state.moviesByGenre}/>)
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
        updateMoviesByGenre: state.updateMoviesByGenre.movies
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