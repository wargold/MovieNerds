import React from 'react'
import Slider from 'react-slick'
import MovieCardComponent from './moviecards'
import './css/slider.css'
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
        return props.movies[index].movies.map((mov) => <div key={mov.id}><MovieCardComponent movie={mov}/></div>)
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
        appendDots: dots => (
            <div style={{
                backgroundColor: '#ddd', borderRadius: '10px', padding: '10px', overflow: 'hidden',
                position: 'absolute', marginBottom: '-20px'
            }}>
                <ul style={{margin: '0px'}}> {dots} </ul>
            </div>
        )
    };

    return (
        <div>
            {getGenresName()}
        </div>
    );
}

export default SimpleSlider