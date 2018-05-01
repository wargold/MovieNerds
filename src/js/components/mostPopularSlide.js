import React from 'react'
import {Carousel} from 'react-bootstrap'
import {Image} from 'react-bootstrap'
import './css/mostPopularSlide.css'
import {Glyphicon} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const MostPopularSlide = (props) => {
    let getMostPopularMovies = () => {
        let temp = props.mostPopular.slice(0, 6).map((movie) =>
            <Carousel.Item key={movie.id}>
                <Image className="kan loader" src={"https://image.tmdb.org/t/p/original" + movie.backdrop_path} responsive/>
                <Carousel.Caption>
                    <h3>{movie.title}</h3>
                    <div>
                        <Glyphicon
                            glyph={'star'}/> {movie.vote_average} &nbsp;
                        <Glyphicon
                            glyph={'heart'}/> {movie.vote_count} &nbsp;<Glyphicon
                        glyph={'calendar'}/> {movie.release_date}
                    </div>
                    <p>{movie.overview}&nbsp; {<Link to={`/movie/${movie.id}`} key={movie.id} style={{ textDecoration: 'none' }}>
                     <Glyphicon className="moreInfo" glyph={'info-sign'}/> </Link>}</p>
                </Carousel.Caption>
            </Carousel.Item>);
        return temp;
    };

    return (
        <div className="mostPopularMovies">
            <h2 className="mostPopularMoviesTitle">{"Most Popular Movies"}</h2>
            <Carousel className="heh" pauseOnHover={true} interval={3000}>
                {getMostPopularMovies()}
            </Carousel>
        </div>
    );
}

export default MostPopularSlide
