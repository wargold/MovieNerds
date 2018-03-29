import React, { Component } from 'react'
import Slider from 'react-slick'
import MovieCardComponent from './moviecards'

const SimpleSlider = (props)=> {
        const {movies}=props;
        const settings = {
            dots: true,
            infinite: true,
            lazyLoad: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: true
        };
    let movie ={title:"tot", subtitle:'hewjjwejew', imga:'http://i.imgur.com/7yUvePI.jpg', overview:'sdjjdsfbd sdfdfssfd sdfnnfjsdnfd sdfnhbdsfbfds sdjjdsfbd sdfdfssfd sdfnnfjsdnfd sdfnhbdsfbfds  sdjjdsfbd sdfdfssfd sdfnnfjsdnfd sdfnhbdsfbfds'}
    let dc = {title:"sds", subtitle:'sffdssfd', imga:'http://i.imgur.com/4EMtxHB.png', overview:'sdjjdsfbd sdfdfssfd sdfnnfjsdnfd sdfnhbdsfbfds'}
        return (
            <div>
                <h2> Single Item</h2>
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
            </div>
        );
}

export default SimpleSlider