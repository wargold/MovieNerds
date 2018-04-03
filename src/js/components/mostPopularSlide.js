import React from 'react'
import {Carousel} from 'react-bootstrap'
import {Image} from 'react-bootstrap'
import './css/mostPopularSlide.css'

const MostPopularSlide = (props) => {
    console.log("Insidan av mososdsddsff",props.mostPopular);

    let getMostPopularMovies = () => {
        let temp = props.mostPopular.slice(0,6).map((movie)=>
            <Carousel.Item>
                <Image className="kan" src={"https://image.tmdb.org/t/p/w780"+movie.backdrop_path} responsive />
                <Carousel.Caption>
                    <h3>{movie.title}</h3>
                    <p>{movie.overview}</p>
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