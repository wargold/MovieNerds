import React from 'react'
import Slider from 'react-slick'
import MovieCardComponent from './moviecards'
import './css/slider.css'
import {Link} from 'react-router-dom'
import LazyLoad from 'react-lazyload';

const SimpleSlider = (props) => {

    let getGenresName = () => {
        let genre = props.genres.map((elem, i) => <div className="genreSliderBox" key={elem.id}>
                <h2 className="genreTitle"> {elem.name}</h2>
                <Slider className="carsoule" {...settings}>
                    {getMoviesByGenre(i)}
                </Slider>
        </div>
    );
    return genre
    };

    let getMoviesByGenre = (index) => {
        return props.movies[index].movies.map((mov) => <div className="slideBox" key={mov.id}>
        <Link to={`/movie/${mov.id}`} key={mov.id}>
        <LazyLoad height={200}>
        <MovieCardComponent movie={mov}/>
        </LazyLoad>
        </Link>
        </div>)
    }

    const settings = {
        focusOnSelect: true,
        dots: true,
        infinite: true,
        lazyLoad: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
    {
        breakpoint: 600,
        settings: {
        slidesToShow: 1
    }
    }
        ],
        appendDots: dots => (
        <div style={{
            backgroundColor: '#ddd', borderRadius: '10px', padding: '10px', overflow: 'hidden',
            position: 'relative'
        }}>
        <ul style={{margin: '0px'}}> {dots} </ul>
        </div>
        )
    };

    return (
        <div className="genreSliderContainer">
            {getGenresName()}
        </div>
    );
    }

    export default SimpleSlider