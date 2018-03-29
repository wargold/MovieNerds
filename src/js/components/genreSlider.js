import React from 'react'
import Slider from 'react-slick'
import MovieCardComponent from './moviecards'

const SimpleSlider = (props) => {
    console.log("GenreSlider")
    console.log((props.genres));

    let getGenresName = () => {
        if (props.genres !== undefined && props.genres.length > 0) {
            let genre = props.genres.map((elem) => <div className="genreSliderBox" key={elem.id}>
                <h2 className="genreTitle"> {elem.name}</h2>
                <Slider className="carsoule" {...settings}>
                    <div>
                        <MovieCardComponent movie={movie}/>
                    </div>
                    <div>
                        <MovieCardComponent movie={dc}/>
                    </div>
                    <div>
                        <MovieCardComponent movie={movie}/>
                    </div>
                </Slider>
            </div>);
            return genre
        } else return <h2>{"Loading..."}</h2>
    };


    const settings = {
        dots: true,
        infinite: true,
        lazyLoad: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true
    };
    let movie = {
        title: "tot",
        subtitle: 'hewjjwejew',
        imga: 'http://i.imgur.com/7yUvePI.jpg',
        overview: 'sdjjdsfbd sdfdfssfd sdfnnfjsdnfd sdfnhbdsfbfds sdjjdsfbd sdfdfssfd sdfnnfjsdnfd sdfnhbdsfbfds  sdjjdsfbd sdfdfssfd sdfnnfjsdnfd sdfnhbdsfbfds'
    }
    let dc = {
        title: "sds",
        subtitle: 'sffdssfd',
        imga: 'http://i.imgur.com/4EMtxHB.png',
        overview: 'sdjjdsfbd sdfdfssfd sdfnnfjsdnfd sdfnhbdsfbfds'
    }
    return (
        <div>
            {getGenresName()}
        </div>
    );
}

export default SimpleSlider