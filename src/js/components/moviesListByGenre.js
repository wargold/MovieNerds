import React from 'react'
import {Col, Grid, Row} from 'react-bootstrap'
import './css/d.scss'
import {Glyphicon} from 'react-bootstrap'
import {URL_IMG, IMG_LOGO_S_SIZE, BROKEN_IMAGE, IMG_LOGO_XS_SIZE} from '../constants/constants'
import {Link} from 'react-router-dom'

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
        let genre = props.movies.map((mov, i) =>
            <Col xs={12} sm={12} md={12} lg={6} key={mov.id}>
                <Link to={`/movie/${mov.id}`} key={mov.id} style={{ textDecoration: 'none' }}>
                <div className="movie_card" id="bright" key={mov.id}>
                    <div className="info_section">
                        <div className="movie_header">
                            <img className="locandina"
                                 src={mov.poster_path == null ? BROKEN_IMAGE
                                     : URL_IMG + IMG_LOGO_S_SIZE + mov.poster_path}
                                 alt={mov.title}/>
                            <h2>{mov.title}</h2>
                            <div className="dsas"><h4>{mov.release_date.substring(0,4)}
                            <span className="minutes"><div><Glyphicon
                                glyph={'star'}/> {mov.vote_average}</div></span>
                            </h4></div>
                        </div>
                        <div className="movie_desc">
                            <p className="text">
                                {mov.overview.substring(0,150)+'...'}
                            </p>
                        </div>
                    </div>
                    <div className="blur_back" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w780${mov.backdrop_path})`}}/>
                </div>
                </Link>
            </Col>
        );

        return genre
    };

    console.log("Kolla dsddsds", props.movies);

    return (
        <div className="genreselectbackground">
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