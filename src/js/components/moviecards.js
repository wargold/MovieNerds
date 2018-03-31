import React from 'react';
import {Image} from 'react-bootstrap'
import styled from 'styled-components'
import {Glyphicon} from 'react-bootstrap'
import {URL_IMG, IMG_LOGO_S_SIZE} from '../constants/constants'

const MovieCardComponent = (props) => {
    const {movie} = props;

    const StyledImg = styled.div`
            height: 250px;
            width: 250px;
    &:hover .image{
       opacity:1;
        transform: scale(1.3);
    }
    &:hover .title{
       opacity: ${movie.subtitle ? 1 : 0};
    }
  `;
    const Info = styled.div`
      position: absolute;
      top: 0;
      margin:10px;
      color:white;
      font-weight:bold;
      opacity:0;
  `;
    return (
        <StyledImg>
            <div className="container" key={movie.id}>
                <Image className="image" src={URL_IMG + IMG_LOGO_S_SIZE + movie.poster_path} responsive/>
                {movie.original_language &&
                <Info className="title">
                    <h4>{movie.original_title}</h4>
                    <Glyphicon glyph={'star'}/> {movie.vote_average} &nbsp;&nbsp; {movie.release_date}
                </Info>
                }
            </div>
        </StyledImg>
    );
}

export default MovieCardComponent;