import React from 'react';
import {Image} from 'react-bootstrap'
import {Glyphicon} from 'react-bootstrap'
import {URL_IMG, IMG_LOGO_M_SIZE, BROKEN_IMAGE} from '../constants/constants'
import './css/moviecards.css'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const MovieCardComponent = (props) => {

    const StyleImage = styled.div`
            height: 278px;
            width:220px;
    &:hover .image{
       opacity:0.3;
    }
    &:hover .title{
       opacity: 1;
    }
  `;
    const MovieInfo = styled.div`
      position: absolute;
      top: 0;
      margin:10px;
      padding-top:10px;
      color:white;
      font-weight:bold;
      opacity:0;
      z-index:200;
  `;

    const movie = props.movie;
    console.log("kom hit 123456")
    return (
        <div className="moviecard">
            <StyleImage className="styleImg">
                <div className="container" key={movie.id}>
                    <Link to={`/movie/${movie.id}`} key={movie.id} style={{textDecoration: 'none'}}>
                        <Image className="image loader" src={movie.poster_path == null ? BROKEN_IMAGE
                            : URL_IMG + IMG_LOGO_M_SIZE + movie.poster_path}
                               alt={movie.original_title} responsive/>
                        <MovieInfo className="title">
                            <h4 className="hiddenTitle">{movie.original_title}</h4> &nbsp;
                            <div><Glyphicon
                                glyph={'star'}/> {movie.vote_average}</div>
                            &nbsp;
                            <div><Glyphicon glyph={'calendar'}/>
                                {movie.release_date}</div>
                        </MovieInfo>
                    </Link>
                </div>
            </StyleImage>
        </div>
    );
}

export default MovieCardComponent;
