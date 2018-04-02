import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getMovieGenres, getMoviesByGenre, updateAllMoviesGenres} from '../actions';
import SimpleSlider from "../components/genreSlider";

class MovieGenreList extends Component {


    componentWillMount() {
        let arr=[];
        let pro=[];

        this.loadData().then((data)=> {data.data.map((elem) => {return (this.loadData2(elem.id)).then(() => {
            arr.push(elem);
            pro.push(this.props.movies);
        })})});
        this.props.updateAllMoviesGenres(arr, pro);
    }

    loadData() {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('This happens 5th (after 3 seconds).');
                resolve(this.props.getMovieGenres());
            }, 3000);
        });
        return promise;
    }

    loadData2(item) {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('This happens 5th (after 3 seconds).');
                resolve(this.props.getMoviesByGenre(item));
            }, 3000);
        });

        console.log('This happens 3rd.');

        return promise;
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