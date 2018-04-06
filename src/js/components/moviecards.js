import React from 'react';
import {Image} from 'react-bootstrap'
import {Glyphicon} from 'react-bootstrap'
import {URL_IMG, IMG_LOGO_M_SIZE, BROKEN_IMAGE, IMG_LOGO_XS_SIZE} from '../constants/constants'
import './css/moviecards.css'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const MovieCardComponent = (props) => {

    const StyledImg = styled.div`
            height: 250px;
            width: 250px;
    &:hover .image{
       opacity:1;
        transform: scale(1.3);
    }
    &:hover .title{
       opacity: 0.9;
    }
  `;
    const Info = styled.div`
      position: absolute;
      top: 0;
      margin:10px;
      color:white;
      font-weight:bold;
      opacity:0;
      z-index:200;
  `;

    const movie = props.movie;
    return (
        <StyledImg>
            <div className="container" key={movie.id}>
                <Link to={`/movie/${movie.id}`} key={movie.id}>
                    <Image className="image loading" src={movie.poster_path == null ? BROKEN_IMAGE
                        : URL_IMG + IMG_LOGO_M_SIZE + movie.poster_path}
                           alt={movie.original_title} responsive/>
                </Link>
                <Info className="title">
                    <h4 className="hiddenTitle">{movie.original_title}</h4>
                    <Glyphicon
                        glyph={'star'}/> {movie.vote_average} &nbsp;&nbsp;<Glyphicon glyph={'calendar'}/>
                    {movie.release_date}
                </Info>
            </div>
        </StyledImg>
    );
}

export default MovieCardComponent;