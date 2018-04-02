import React from 'react';
import {Image} from 'react-bootstrap'
import {Glyphicon} from 'react-bootstrap'
import {URL_IMG, IMG_LOGO_M_SIZE, BROKEN_IMAGE, IMG_LOGO_XS_SIZE} from '../constants/constants'
import {StyledImg, Info} from './css/movieCardStyleComp'
import './css/moviecards.css'
class MovieCardComponent extends React.Component {
    constructor() {//Can have a state due to that it only handles local state about a image...
        super();
        this.state = {
            img_loaded: false,
            img_error: false,
        };
    }

    handleImageError() {
        this.setState({
            img_error: true,
        });
    }

    render() {
        const movie = this.props.movie;
        return (
            <StyledImg>
                {!this.state.img_loaded && !this.state.img_error}
                {!this.state.img_error ?
                <div className="container" key={this.props.movie.id}>
                    <Image className="image" src={this.props.movie.poster_path==null ? BROKEN_IMAGE
                        : URL_IMG + IMG_LOGO_M_SIZE + this.props.movie.poster_path}
                           alt={this.props.movie.original_title} responsive  onLoad={() => this.setState({
                        img_loaded: true,
                    })}
                           onError={() => this.handleImageError()}/>
                    {movie.original_language &&
                    <Info className="title">
                        <h4 className="hiddenTitle">{movie.original_title}</h4>
                        <Glyphicon
                            glyph={'star'}/> {this.props.movie.vote_average} &nbsp;&nbsp; {this.props.movie.release_date}
                    </Info>
                    }
                </div>: <h2>{movie.original_title}</h2> }
            </StyledImg>
        );
    }
}

export default MovieCardComponent;
