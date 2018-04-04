import React from 'react';
import {Image} from 'react-bootstrap'
import {Glyphicon} from 'react-bootstrap'
import {URL_IMG, IMG_LOGO_M_SIZE, BROKEN_IMAGE, IMG_LOGO_XS_SIZE} from '../constants/constants'
import {StyledImg, Info} from './css/movieCardStyleComp'
import './css/moviecards.css'
import loader from '../../img/gif/loadingCircle.gif'
import {Link} from 'react-router-dom'

class MovieCardComponent extends React.Component {
    constructor() {//Can have a state due to that it only handles local state about a image...
        super();
        this.state = {
            img_loaded: false
        };
    }

    render() {
        const movie = this.props.movie;
        return (
            <StyledImg>
                <div className="container" key={movie.id}>
                    {!this.state.img_loaded && <div><Image src={loader}/></div>}
                    <Link to={`/movie/${movie.id}`} key={movie.id}>
                    <Image className="image" src={movie.poster_path == null ? BROKEN_IMAGE
                        : URL_IMG + IMG_LOGO_M_SIZE + movie.poster_path}
                           alt={movie.original_title} responsive onLoad={() => this.setState({
                        img_loaded: true,
                    })}/>
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
}

export default MovieCardComponent;
