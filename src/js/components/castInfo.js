import React from 'react'
import './css/slider.css'
import {Link} from 'react-router-dom'
import {IMG_LOGO_S_SIZE, URL_IMG} from "../constants/constants";
import {Image, Col, Grid, Row} from 'react-bootstrap'
require('./css/cast.css')
import MovieCardComponent from './moviecards'

const CastInfo = (props) => {

    let getMovies = () => {
        let cast = props.moviesKnown.slice(0, 5).map((movie) =>
            (<Col xs={12} sm={4} md={3} key={movie.id}>
                <div className="actPlayMovies">
                <Link to={`/movie/${movie.id}`} key={movie.id} style={{textDecoration: 'none'}}>
                    <MovieCardComponent movie={movie}/>
                </Link>
                </div>
            </Col>))
        return cast;
    };

    let castInfo = () => {
        let info = (
            <div>
                <div className="description"> {<p>{props.castInfo.name}</p>} </div>
                <div className="bday"> {<p>{props.castInfo.birthday}</p>}</div>
                <div className="birth"> {<p>{props.castInfo.place_of_birth}</p>}</div>
                <div className="biotitle"> Bio</div>
                <div className="bio"> {<p>{props.castInfo.biography}</p>} </div>
                <div className="knownfor">Stars in:</div>
            </div>
        );
        return info;
    };

    return (
        <div>
            <div className="profilepic">
                <Image src={URL_IMG + IMG_LOGO_S_SIZE + props.castInfo.profile_path} rounded/>
            </div>
            {castInfo()}
            <div>
                <Grid fluid={true}>
                    <Row>
                {getMovies()}
                    </Row>
                </Grid>
                </div>
        </div>
    );
}

export default CastInfo
