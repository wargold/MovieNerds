import React from 'react';
import {Image} from 'react-bootstrap'
import styled from 'styled-components'
import {Glyphicon} from 'react-bootstrap'

const MovieCardComponent = (props) => {
    const {movie} = props;
    const StyledImg = styled.div`
            height: 200px;
            width: 200px;
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
            <div className="container">
                <Image className="image" src={movie.imga} responsive/>
                {movie.subtitle &&
                <Info className="title">
                    <h4>{movie.title}</h4>
                    <Glyphicon glyph={'star'}/> {"10"} &nbsp;&nbsp; {"2019"}
                </Info>
                }
            </div>
        </StyledImg>
    );
}

export default MovieCardComponent;