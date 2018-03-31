import React from 'react'
import Slider from 'react-slick'
import MovieCardComponent from './moviecards'

const SimpleSlider = (props) => {

    let getGenresName = () => {
        let genre = props.genres.map((elem, i) => <div className="genreSliderBox" key={elem.id}>
            <h2 className="genreTitle"> {elem.name}</h2>
            <Slider className="carsoule" {...settings}>
                {getMoviesByGenre(i)}
            </Slider>
        </div>);
        return genre
    };

    let getMoviesByGenre = (index) => {
        return props.movies[index].movies.map((mov) => <div><MovieCardComponent movie={mov}/></div>)
    }


    const settings = {
        dots: true,
        infinite: true,
        lazyLoad: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true
    };

    return (
        <div>
            {getGenresName()}
        </div>
    );
}

export default SimpleSlider