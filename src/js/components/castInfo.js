import React from 'react'
import './css/slider.css'
import {Link} from 'react-router-dom'
import {IMG_LOGO_S_SIZE, URL_IMG} from "../constants/constants";
import {Image,Col} from 'react-bootstrap'
import './css/cast.css'
import MovieCardComponent from './moviecards'

const CastInfo = (props) => {

    let getMovies = () => {
        let cast = props.moviesKnown.slice(0, 5).map((movie) =>
            (<Col xs={4} sm={3} md={2} key={movie.id}>
                <Link to={`/movie/${movie.id}`} key={movie.id}>
                    <MovieCardComponent movie={movie}/>
                </Link>
            </Col>))
        return cast;
    };

    let castInfo = () => {
        let info = (
            <div>
                <h3 className="text" > Name: {<p>{props.castInfo.name}</p>} </h3>
                <h3 className="text"> Biography: {<p>{props.castInfo.biography}</p>} </h3>
                <h3 className="text"> Birthday: {<p>{props.castInfo.birthday}</p>}</h3>
                <h3 className="text"> Place Of Birth: {<p>{props.castInfo.place_of_birth}</p>}</h3>
            </div>
        );
        return info;
    };

    return (
        <div>
            <Image src={URL_IMG+IMG_LOGO_S_SIZE+props.castInfo.profile_path} responsive circle/>
            {castInfo()}
            <div><h2 className="text">Known For</h2>{getMovies()}</div>
        </div>
    );
}

export default CastInfo