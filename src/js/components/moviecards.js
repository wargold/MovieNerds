import React from 'react';
import {Image} from 'react-bootstrap'
import styled from 'styled-components'
import {Glyphicon} from 'react-bootstrap'
import {URL_IMG, IMG_LOGO_S_SIZE} from '../constants/constants'

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
      color:darkgrey;
      font-weight:bold;
      opacity:0;
  `;

class MovieCardComponent extends React.Component {

    render() {
        const movie = this.props.movie;
        return (
            <StyledImg>
                <div className="container" key={this.props.movie.id}>
                    <Image className="image" src={URL_IMG + IMG_LOGO_S_SIZE + this.props.movie.poster_path}
                           alt={this.props.movie.original_title} responsive/>
                    {movie.original_language &&
                    <Info className="title">
                        <h4>{movie.original_title}</h4>
                        <Glyphicon
                            glyph={'star'}/> {this.props.movie.vote_average} &nbsp;&nbsp; {this.props.movie.release_date}
                    </Info>
                    }
                </div>
            </StyledImg>
        );
    }
}

export default MovieCardComponent;

