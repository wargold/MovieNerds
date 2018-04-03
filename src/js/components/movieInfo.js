import React from 'react';
import {Image} from 'react-bootstrap'
import {Glyphicon,Col} from 'react-bootstrap'
import ModalVideo from 'react-modal-video'
import MovieCardComponent from './moviecards'
import {URL_IMG, IMG_LOGO_S_SIZE} from "../constants/constants"
import {Link} from 'react-router-dom'
import './css/movie.css'

class MovieInfo extends React.Component {
    constructor() {//Can have a state due to that it only handles local state about a image...
        super()
        this.state = {
            isOpen: false
        }
        this.openModal = this.openModal.bind(this)
    }

    openModal() {
        this.setState({isOpen: true})
    }

    getVideo() {
        if (this.props.trailer.length > 0) {
            return (<div className="player">
                <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId={this.props.trailer[0].key}
                            onClose={() => this.setState({isOpen: false})}/>
                <Glyphicon className="playIcon" glyph={'play-circle'} onClick={this.openModal}/>
            </div>);
        } else {
            return (<h2>Sorry No Trailer Available!</h2>)
        }
    }

    getImages() {
        let temp = (
            <div>
                <MovieCardComponent className="picture" movie={this.props.movie}/>
                <Image className="poster" src={"https://image.tmdb.org/t/p/w780" + this.props.movie.backdrop_path} responsive/>
            </div>

        );
        return temp;
    }

    getMovieInfo() {
        let info = (
            <div>
                <h3> Info: {<p>{this.props.movie.overview}</p>} </h3>
                <h3> Vote: {<p>{this.props.movie.vote_average}</p>}</h3>
                <h3> Genres: {<div>{this.getMovieGenres()}</div>}</h3>

            </div>
        );
        return info;
    }

    getMovieGenres(){
        let genres = this.props.movie.genres.map((genre)=>(<h6 key={genre.id}>{genre.name}</h6>))
        return genres;
    }

    getCast(){
        let cast = this.props.castList.slice(0,5).map((actor)=>
            ( <Col xs={4} sm={3} md={2} key={actor.cast_id}>
                <Link to={`/cast/${actor.id}`} key={actor.id}>
                <div>
                <Image src={URL_IMG+IMG_LOGO_S_SIZE+actor.profile_path} responsive circle/>
                <h3> Character: {<p>{actor.character}</p>} </h3>
                <h3> Name: {<p>{actor.name}</p>} </h3>
                </div>
                </Link>
            </Col>))
        return cast;
    }

    render() {
        const movie = this.props.movie;
        console.log("Insidan i COmponent movieInfo", this.props.movie);
        console.log("Insidan i COmponent trailer", this.props.trailer);
        console.log("Insidan i COmponent castlist", this.props.castList);

        return (
            <div>
                <h2>{movie.title}</h2>
                <div>{this.getMovieInfo()}</div>
                <div>{this.getImages()}</div>
                <div>{this.getVideo()}</div>
                <div>{this.getCast()}</div>
            </div>
        );
    }
}

export default MovieInfo;
