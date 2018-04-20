import React from 'react';
import { Image } from 'react-bootstrap'
import { Glyphicon, Col, Grid, Row, Button } from 'react-bootstrap'
import ModalVideo from 'react-modal-video'
import MovieCardComponent from './moviecards'
import { URL_IMG, IMG_LOGO_S_SIZE, BROKEN_IMAGE } from "../constants/constants"
import { Link } from 'react-router-dom'
import { database, auth } from '../constants/base'
import './css/movie.css'


class MovieInfo extends React.Component {
    constructor() {//Can have a state due to that it only handles local state about a image...
        super()
        this.state = {
            isOpen: false,
            isFav: false
        }
        this.openModal = this.openModal.bind(this)
    }


    openModal() {
        this.setState({ isOpen: true })
    }

    getVideo() {
        if (this.props.trailer.length > 0) {
            return (<div className="player">
                <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId={this.props.trailer[0].key}
                    onClose={() => this.setState({ isOpen: false })} />
                <Glyphicon className="playIcon" glyph={'play-circle'} onClick={this.openModal} />
            </div>);
        } else {
            return (<h2 className="notrailer">Sorry No Trailer Available!</h2>)
        }
    }

    getImages() {
        let temp = (
            <div>
                <div className="poster">
                    <Image className="pos loader"
                        src={this.props.movie.backdrop_path == null ? BROKEN_IMAGE
                            : "https://image.tmdb.org/t/p/w780" + this.props.movie.backdrop_path}
                        responsive />
                    <div className="ghd">
                        <MovieCardComponent className="picture" movie={this.props.movie} />
                    </div>
                    {this.getVideo()}
                </div>
            </div>

        );
        return temp;
    }

    getMovieInfo() {
        let info = (
            <div>
                <div className="icons"><Glyphicon
                    glyph={'star'} />{this.props.movie.vote_average} &nbsp;
                    <Glyphicon
                        glyph={'heart'} /> {this.props.movie.vote_count} &nbsp;<Glyphicon
                        glyph={'calendar'} /> {this.props.movie.release_date} </div>
                <h3 className="fs"> Info: {<p>{this.props.movie.overview}</p>} </h3>
                <h3 className="fs"> Genres: {<div>{this.getMovieGenres()}</div>}</h3>
            </div>
        );
        return info;
    }

    getMovieGenres() {
        let genres = this.props.movie.genres.map((genre) => (<h6 key={genre.id}>{genre.name}</h6>))
        return genres;
    }

    getCast() {
        let cast = this.props.castList.slice(0, 5).map((actor) =>
            (<Col xs={4} sm={3} md={2} key={actor.cast_id}>
                <Link to={`/cast/${actor.id}`} key={actor.id} style={{ textDecoration: 'none' }}>
                    <div>
                        <Image className="loader" src={actor.profile_path == null ? BROKEN_IMAGE
                            : URL_IMG + IMG_LOGO_S_SIZE + actor.profile_path} alt={actor.name} responsive
                               circle />
                        <h3 className="fs"> Character: {<p>{actor.character}</p>} </h3>
                        <h3 className="fs"> Name: {<p>{actor.name}</p>} </h3>
                    </div>
                </Link>
            </Col>))
        return cast;
    }

    getSimilarMovies() {
        let temp=  <h3 className="nonsimilarMovies">No Similar movies Found!</h3>;
        if (this.props.similarMovies.length>0) {
             temp = this.props.similarMovies.slice(0, 5).map((movie) =>
                <Col xs={4} sm={3} md={2} key={movie.id}>
                    <MovieCardComponent className="picture" movie={movie}/>
                    <h3 className="fs"> Movie: {<p>{movie.original_title}</p>} </h3>
                </Col>
            );
        }
        return temp;
    }

    addFavorite(id) {
        console.log(id)
        var self = this;

        database.ref('users/' + auth.currentUser.uid + '/favorites').once('value').then(function (snapshot) {
            var favs = snapshot.val()
            if (favs !== null && favs.includes(id)) {
                console.log("Already favorited")
            } else {
                if (favs === null) {
                    favs = [];
                }
                favs.push(id);
                console.log(favs)
                self.setState({
                    isFav: true
                })
                var ref = database.ref('users/' + auth.currentUser.uid).child('favorites').set(favs);
            }
        })
    }

    removeFavorite(id) {
        var self = this;
        database.ref('users/' + auth.currentUser.uid + '/favorites').once('value').then(function (snapshot) {
            var favs = snapshot.val()
            if (favs !== null && favs.includes(id)) {
                var index = favs.indexOf(id);
                if (index > -1) {
                    favs.splice(index, 1);
                }
                console.log(favs)
                self.setState({
                    isFav: false
                })
                var ref = database.ref('users/' + auth.currentUser.uid).child('favorites').set(favs);
            } else {
                console.log("Not in favs")
            }
        })
    }

    componentDidMount() {
        console.log("KOLA ASASSA", auth.currentUser);
        if ( auth.currentUser !== null) {
            var self = this;
            database.ref('users/' + auth.currentUser.uid + '/favorites').once('value').then(function (snapshot) {
                var favs = snapshot.val()
                if (favs !== null && favs.includes(self.props.movie.id)) {
                    console.log("-----IS FAV")
                    self.setState({
                        isFav: true
                    })
                }
            })
        }
    }

    render() {
        const movie = this.props.movie;
        console.log("kolla movieinfo", movie);
        const favButton = this.state.isFav && this.props.user !== '' ? (
            <Button onClick={() => { this.removeFavorite(movie.id) }}>
                <Glyphicon glyph="trash" /> Remove Favorite
                </Button>
        ) : (<div>
            <Button onClick={() => { this.addFavorite(movie.id) }}>
                <Glyphicon glyph="heart" /> Add Favorite
                </Button>
        </div>
            );

        let ren = () =>{
            if (this.props.user !== '' ){
                return favButton;
            }
        }

        return (
            <div className="tests">
                <div>{this.getImages()}</div>
                <div>
                    <Grid fluid={true}>
                        <Row>
                            <h1>{movie.title}</h1>
                            {ren()}
                            <div>{this.getMovieInfo()}</div>
                        </Row>
                        <Row>
                            <h1>Cast Members:</h1>
                            {this.getCast()}
                        </Row>
                        <Row>
                            <h1>Movies That You May Like:</h1>
                            {this.getSimilarMovies()}
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default MovieInfo;
