import React from 'react';
import {Image} from 'react-bootstrap'
import {Glyphicon} from 'react-bootstrap'
import {URL_IMG, IMG_LOGO_M_SIZE, BROKEN_IMAGE} from '../constants/constants'
import './css/moviecards.css'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const MovieCardComponent = (props) => {

    const StyleImage = styled.div`
            height: 278px;
            width:220px;
    &:hover .image{
       opacity:0.25;
    }
    &:hover .title{
       opacity: 1;
    }
  `;
    const MovieInfo = styled.div`
      position: absolute;
      top: 0;
      margin:10px;
      padding-top:10px;
      color:white;
      font-weight:bold;
      opacity:0;
      z-index:200;
  `;

    const movie = props.movie;

    function drag(ev) {
        console.log(ev.target)
        //ev.dataTransfer.setData("image", ev.target);
        // var sendObj = {
        //     src: ev.target.getAttribute("src"),
        //     id: ev.target.getAttribute("data-id"),
        //     alt: ev.target.getAttribute("alt")
        // }

        //ev.dataTransfer.setData("id", JSON.stringify(sendObj));


        /*
        *  if(ev.target.pathname)
        let myRe = new RegExp('^/movie/(.*)');
        let id = myRe.exec(ev.target.pathname);
        console.log("hittat id", id[1]);
        ev.dataTransfer.setData("id", ev.target.getAttribute("data-id"));

        var x = document.getElementById("glyptest");
        x.style.color = "red";
        console.log("Drag start")
        */

        if(ev.target.getAttribute("data-id") !== null) {
            ev.dataTransfer.setData("id", ev.target.getAttribute("data-id"));
            }else {
            ev.dataTransfer.setData("id", ev.target.firstChild.getAttribute("data-id"));
        }
        var x = document.getElementById("glyptest");
        x.style.color = "red";
        console.log("Drag start")
    }

    function dragE(ev) {

        var x = document.getElementById("glyptest");
        x.style.color = "white";
        console.log("Drag end")
    }

    let dragStyle = {
        cursor: 'pointer'
    }

    return (
        <div className="moviecard">
            <StyleImage className="styleImg" draggable="true" onDragStart={drag} onDragEnd={dragE}>
                <div className="container" key={movie.id}>
                    <Link to={`/movie/${movie.id}`} key={movie.id} style={{textDecoration: 'none'}}>
                        <Image className="image loader" style={dragStyle} data-id={movie.id} src={movie.poster_path == null ? BROKEN_IMAGE
                            : URL_IMG + IMG_LOGO_M_SIZE + movie.poster_path}
                               alt={movie.title} responsive/>
                        <MovieInfo className="title">
                            <h4 className="hiddenTitle" draggable="false">{movie.title}</h4> &nbsp;
                            <div><Glyphicon
                                glyph={'star'}/> {movie.vote_average}&nbsp;/&nbsp;10
                            </div>
                            &nbsp;
                            <div><Glyphicon glyph={'calendar'}/>
                                {movie.release_date === "" ? 'Unavailable' : movie.release_date}
                            </div>
                        </MovieInfo>
                    </Link>
                </div>
            </StyleImage>
        </div>
    );
}

export default MovieCardComponent;
