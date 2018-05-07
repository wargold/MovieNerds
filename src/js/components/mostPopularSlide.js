import React from 'react'
import {Carousel} from 'react-bootstrap'
import {Image} from 'react-bootstrap'
import './css/mostPopularSlide.css'
import {Glyphicon} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Ratio from 'react-ratio';
import Truncate from 'react-truncate';

const MostPopularSlide = (props) => {
    let getMostPopularMovies = () => {
        let temp = props.mostPopular.slice(0, 6).map((movie) =>
            <Carousel.Item key={movie.id}>
                <Ratio ratio={ 21 / 9 }>
                <Image className="kan loader" src={"https://image.tmdb.org/t/p/w1280" + movie.backdrop_path}
                       responsive/>
                <Carousel.Caption>
                    <h3 id="movieTitle">{movie.title}</h3>
                    <div id="glyphIcons">
                        <Glyphicon
                            glyph={'star'}/> {movie.vote_average} &nbsp;
                        <Glyphicon
                            glyph={'heart'}/> {movie.vote_count} &nbsp;<Glyphicon
                        glyph={'calendar'}/> {movie.release_date}
                    </div>
                    <Truncate id="movieInfo" lines={2} ellipsis={<span>...</span>}>
                        {movie.overview}
                    </Truncate>&nbsp;{<div><Link to={`/movie/${movie.id}`} key={movie.id}
                                                     style={{textDecoration: 'none'}}>
                    <Glyphicon className="moreInfo" glyph={'info-sign'}/> </Link></div>}
                </Carousel.Caption>
                </Ratio>
            </Carousel.Item>);
        return temp;
    };

    return (
        <div className="mostPopularMovies">
            <h2 className="mostPopularMoviesTitle">{"Most Popular Movies"}</h2>
            <Ratio ratio={ 21 / 9 }>
            <Carousel className="heh" pauseOnHover={true} interval={2000000000}>
                {getMostPopularMovies()}
            </Carousel>
            </Ratio>
        </div>
    );
}

export default MostPopularSlide
