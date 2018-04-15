import React from 'react'
import MovieCardComponent from './moviecards'
import {Col, Grid, Row} from 'react-bootstrap'

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
        return (<h2 className="genresTitle">{name}</h2>);
    };

    let getMovies = () => {
        let genre = props.movies.map((mov) =>
            <Col xs={4} sm={3} md={2} key={mov.id}>
            <MovieCardComponent movie={mov}/>
            </Col>);

        return genre
    };

    return (
            <div>
                <Grid fluid={true}>
                    <Row>
                        {getGenresName()}
                        {getMovies()}
                    </Row>
                </Grid>
            </div>
    );
}

export default MoviesListByGenres