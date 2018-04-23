import React from 'react'
import Slider from 'react-slick'
import MovieCardComponent from './moviecards'
import './css/slider.css'
import {Link} from 'react-router-dom'
import LazyLoad from 'react-lazyload';

const SimpleSlider = (props) => {

    let getGenresName = () => {
        props.movies.sort(function (a, b) {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
        });
        let genre = props.movies.map((elem, i) => <div className="genreSliderBox" key={i}>
                <h2 className="genreTitle"> {elem.name}</h2>
                <Slider className="carsoule" {...settings}>
                    {getMoviesByGenre(elem.data)}
                </Slider>
            </div>
        );
        return genre
    };

    let getMoviesByGenre = (data) => {
        return data.map((mov) => <div className="slideBox" key={mov.id}>
            <Link to={`/movie/${mov.id}`} key={mov.id} style={{textDecoration: 'none'}}>
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
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: 700,
                settings: {
                    slidesToShow: 3
                }
            }
            ,
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5
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
    console.log("Movie props", props.movies);
    return (
        <div className="genreSliderContainer">
            {getGenresName()}
        </div>
    );
}

export default SimpleSlider