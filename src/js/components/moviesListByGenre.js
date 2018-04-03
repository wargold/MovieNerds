import React from 'react'
import MovieCardComponent from './moviecards'
import {row} from 'react-bootstrap'
const MoviesListByGenres = (props) => {


    let getGenresName = () => {

        const lenOfGenres = props.genres.length;
        let name = '';
        for (var i = 0; i < lenOfGenres; i++) {
            name += props.genres[i].name;
            if (i !== (lenOfGenres - 1)) {
                name += ', ';
            }
        }
        console.log("name", name);
        console.log("props.genres", props.genres);

        return (<h2 className="sdds">{name}</h2>);
    };

    let getMovies = () => {
        let genre = props.movies.map((mov) => <div className="genreSliderBox" key={mov.id}>
            <MovieCardComponent movie={mov}/>
        </div>);
        return genre
    };

    console.log("Indid MoviesListByGenres", props.movies);
    props.movies.map((elem) => {
        console.log("m ", elem.title)
    });
    return (
        <div>
            {getGenresName()}
            <row>
                {getMovies()}
            </row>
        </div>
    );
}

export default MoviesListByGenres