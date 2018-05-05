import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as d3 from "d3";
import { getSimilarMovies, updateAllMoviesGenres, getFavoriteSimilarMovies, getFavoriteActors, setAuthenticated, notLoggedIn } from '../actions';
import { database, auth, app, base } from "../constants/base";
import { black } from 'material-ui/styles/colors';
import { Col, Grid, Row, Glyphicon, Button } from 'react-bootstrap'
import { Loader } from '../../loader/loader'
import history from '../history';
import {Spinner} from '@blueprintjs/core';

let trs = [];

class Vis extends Component {

    // componentDidMount() {
    //     //Get all the similar movies from the favorite list
    //     this.handle();
    //     setTimeout(() => {
    //         this.props.getFavoriteSimilarMovies(trs);
    //     }, 1500)
    // }

    componentDidMount() {
        this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("logged in", user.displayName)
                if (user.displayName === null) {
                    this.props.setAuthenticated(user.email);
                } else { this.props.setAuthenticated(user.displayName); }

            } else {
                console.log("not logged in")
                this.props.notLoggedIn();
            }
            this.handle();
            setTimeout(() => {
                this.props.getFavoriteSimilarMovies(trs);
            }, 1500)
        })

    }

    handle() {
        let favs = [];
        trs = [];
        database.ref('users/' + auth.currentUser.uid + '/favorites').once('value').then(function (snapshot) {
            favs = snapshot.val();
            favs.map((id) => trs.push(id));
        });
    }


    render() {

        if (this.props.loading) {
            return (
                <div style={{textAlign: "center", position: "absolute", top: "25%", left: "50%"}}>
                    <h3>Loading</h3>
                    <Spinner/>
                </div>
            )
        }

        console.log("visualization.js favorite similar movies", this.props.similarFavoriteMov.similarFavorite);
        console.log("visualization.js favorite similar actors", this.props.favoriteActors.similarFavorite);

        var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 5;
        var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 5;


        d3.select("svg").remove();
        var svg = d3.select("#vis")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
        // .style("border-style", "solid");


        var fav = this.props.similarFavoriteMov.similarFavorite

        for (i = 0; i < fav.length; i++) {
            fav[i].poster_path = fav[i].FavMovieID.poster_path;
            fav[i].title = fav[i].FavMovieID.original_title;
            fav[i].id = fav[i].FavMovieID.id;
            fav[i].overview = fav[i].FavMovieID.overview;
            fav[i].isFav = true;
        }

        console.log(fav)

        var simi = []

        for (i = 0; i < this.props.similarFavoriteMov.similarFavorite.length; i++) {
            simi.push(this.props.similarFavoriteMov.similarFavorite[i].data);
        }

        console.log(simi)


        var edges = [];

        var nodes = JSON.parse(JSON.stringify(fav));

        var index = fav.length - 1;

        // Loop all fav
        for (var i = 0; i < fav.length; i++) {
            // Loop all similiar movies

            for (var j = 0; j < simi[i].length; j++)


                if (checkExist(nodes, simi[i][j])) { // Similar already exists
                    console.log("exists")

                    edges.push({
                        'source': i,
                        'target': checkExist(nodes, simi[i][j])
                    })
                } else { //Doesnt exist
                    console.log("not exists")
                    //console.log(simi[i][j])
                    index++;
                    nodes.push(simi[i][j])
                    //console.log(simi[i][j])

                    console.log(index)
                    edges.push({
                        'source': i,
                        'target': index
                    })

                }

        }
        console.log(edges)


        function checkExist(array, o) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].id === o.id) {

                    return i;
                } else {
                    //console.log(array[i].id, o.id)
                }
            }
            return false;
        }

        function distance() {
            return 200;
        }

        var simulation = d3.forceSimulation()
            .force("link", d3.forceLink().distance(distance()).strength(0.1))
            .force("charge", d3.forceManyBody().strength(-5))
            .force("collide", d3.forceCollide().radius(10))
            .force("center", d3.forceCenter(width / 2, height / 2));

        var links = svg.selectAll("foo")
            .data(edges)
            .enter()
            .append("line")
            .style("stroke", "#ccc")
            .style("stroke-width", 1);

        var color = d3.scaleOrdinal(d3.schemeCategory20);

        var node = svg.selectAll("foo")
            .data(nodes)
            .enter()
            .append("g")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        var nodeCircle = node.append("circle")
            .attr("r", 1)
            .attr("stroke", "gray")
            .attr("stroke-width", "2px")
            .attr("fill", "white");


        // Config for image
        // var imageH = 50;
        // var imageW = 50;

        function imageH(d) {
            if (d.isFav) {
                return 100;
            } else {
                return 50;
            }
        }

        function imageW(d) {
            if (d.isFav) {
                return 100;
            } else {
                return 50;
            }
        }


        var nodeImage = node.append("image")
            .attr("xlink:href", d => 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + d.poster_path)
            .attr("height", d =>  imageH(d))
            .attr("width",  d => imageW(d))
            .attr("x",  d =>  -(imageW(d) / 2))
            .attr("y",  d =>  -(imageH(d) / 2))

        var texts = node.append("text")
            .style("fill", "black")
            .attr("dx", 20)
            .attr("dy", 8)
            .text(function (d) {
                return;
            });

        // make the image grow a little on mouse over and add the text details on click
        var setEvents = nodeImage
            // Append hero text
            // click on a node
            .on('click', function (d) {
                console.log(d)
                d3.select("#titlet").html(d.title);
                d3.select("#title").attr("href", '/movie/' + d.id);
                d3.select("#image").attr("src", 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + d.poster_path);
                d3.select("#desc").html(d.overview);


            })
            .on('mouseenter', function () {
                // select element in current context
                d3.select(this)
                    .transition()
                    .attr("x", function (d) {
                        return -imageW(d);
                    })
                    .attr("y", function (d) {
                        return -imageH(d);
                    })
                    .attr("height",  d =>  imageH(d) * 2)
                    .attr("width",  d =>  imageW(d) * 2);
            })
            // set back
            .on('mouseleave', function () {
                d3.select(this)
                    .transition()
                    .attr("height",  d =>  imageH(d))
                    .attr("width",  d =>  imageW(d))
                    .attr("x",   d => -(imageW(d) / 2))
                    .attr("y",  d =>  -(imageH(d) / 2))
            });


        simulation.nodes(nodes);
        simulation.force("link")
            .links(edges);

        simulation.on("tick", function () {

            var radius = 1;

            node.attr("transform", function (d) {

                var x = Math.max(radius, Math.min(width - radius, d.x));
                var y = Math.max(radius, Math.min(height - radius, d.y));
                return "translate(" + x + "," + y + ")";
            })

            node.attr("cx", function (d) {
                return d.x = Math.max(radius, Math.min(width - radius, d.x));
            })
                .attr("cy", function (d) {
                    return d.y = Math.max(radius, Math.min(height - radius, d.y));
                });

            links.attr("x1", function (d) {
                return d.source.x;
            })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });


        });

        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        var divStyle = {
            color: '#FFF'
        };

        var headStyle = {
            padding: '40px',
            position: 'absolute',
            top: '20px',
            left: '0',
            'pointer-events': 'none'
        };

        var headStyle2 = {
            padding: '20px',
            position: 'absolute',
            top: '0',
            left: '0',

        };


        var imgStyle = {
            opacity: '0.2',
            filter: 'alpha(opacity = 50)'
        }

        var buttonStyle = {
            position: 'absolute',
            right: '10px',
            top: '10px'
        }

        return (
            
            this.props.auth.user !== '' ? (
                <div>
                    <a style={headStyle2} id="title" href="" target="_blank"><h2 id="titlet">Click a movie!</h2></a>
                    <Button style={buttonStyle} onClick={() => history.push('/myfavorites')}>Back to favorites</Button>
                    <header style={headStyle}>

                        <h3 id="desc" style={divStyle}></h3>
                        <img id="image" src="" style={imgStyle}></img>
                    </header>
                    <section id="vis"></section>


                </div>
            ) : (<h2>You Have To Be Logged In To Show This Page!</h2>))

    }
}

function mapStateToProps(state) {
    return {
        similarMovies: state.similarMovies.movieInfo,
        updateMoviesByGenre: state.updateMoviesByGenre,
        similarFavoriteMov: state.similarFavoriteMov,
        favoriteActors: state.favoriteActors,
        auth: state.auth,
        loading: state.auth.loading
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getSimilarMovies: getSimilarMovies,
        updateAllMoviesGenres: updateAllMoviesGenres,
        getFavoriteSimilarMovies: getFavoriteSimilarMovies,
        getFavoriteActors: getFavoriteActors,
        setAuthenticated: setAuthenticated,
        notLoggedIn: notLoggedIn
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Vis);


let favorite = [284054, 284053, 76338, 1924];//Black panther and thor ragnarok

//let favorite =[284054,338970];//Black panther and tom raider
