import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as d3 from "d3";
import {
    getSimilarMovies, getFavoriteSimilarMovies, setAuthenticated, notLoggedIn, checkDB
} from '../actions';
import {auth, app} from "../constants/base";
import {black} from 'material-ui/styles/colors';
import {Button} from 'react-bootstrap'
import {Loader} from '../Help Functions/loader/loader'
import history from '../history';
import {Spinner} from '@blueprintjs/core';
import {BROKEN_IMAGE} from '../constants/constants'
import './css/visualization.css'
import PopUpFavPageInfo from '../components/PopUpPageInfo';

class Vis extends Component {

    constructor() {//Can have a state due to that it only handles local state
        super()
        this.state = {
            loadedFavorite: false
        }
    }

    componentDidMount() {
        app.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("logged in", user.displayName)
                if (user.displayName === null) {
                    this.props.setAuthenticated(user.email);
                } else {
                    this.props.setAuthenticated(user.displayName);
                }

            } else {
                console.log("not logged in")
                this.props.notLoggedIn();
            }
            if (auth.currentUser !== null) {
                this.props.checkFavMovieDB(auth.currentUser.uid);
            }
            setTimeout(() => {
                this.props.getFavoriteSimilarMovies(this.props.favoriteID);
                this.setState({
                    loadedFavorite: true
                });
            }, 2000)
        })

    }

    render() {

        console.log("visualization.js favorite similar movies", this.props.similarFavoriteMov.similarFavorite);

        let width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 5;
        let height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 5;


        d3.select("svg").remove();
        let svg = d3.select("#vis")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
        // .style("border-style", "solid");


        let fav = this.props.similarFavoriteMov.similarFavorite

        for (let i = 0; i < fav.length; i++) {
            fav[i].poster_path = fav[i].FavMovieID.poster_path;
            fav[i].title = fav[i].FavMovieID.title;
            fav[i].id = fav[i].FavMovieID.id;
            fav[i].overview = fav[i].FavMovieID.overview;
            fav[i].isFav = true;
        }

        console.log(fav)

        let simi = []

        for (let i = 0; i < this.props.similarFavoriteMov.similarFavorite.length; i++) {
            simi.push(this.props.similarFavoriteMov.similarFavorite[i].data);
        }

        console.log(simi)


        let edges = [];

        let nodes = JSON.parse(JSON.stringify(fav));

        let index = fav.length - 1;

        // Loop all fav
        for (let i = 0; i < fav.length; i++) {
            // Loop all similiar movies

            for (let j = 0; j < simi[i].length; j++)


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
            for (let i = 0; i < array.length; i++) {
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

        let simulation = d3.forceSimulation()
            .force("link", d3.forceLink().distance(distance()).strength(0.1))
            .force("charge", d3.forceManyBody().strength(-5))
            .force("collide", d3.forceCollide().radius(10))
            .force("center", d3.forceCenter(width / 2, height / 2));

        let links = svg.selectAll("foo")
            .data(edges)
            .enter()
            .append("line")
            .style("stroke", "#ccc")
            .style("stroke-width", 1);

        let color = d3.scaleOrdinal(d3.schemeCategory20);

        let node = svg.selectAll("foo")
            .data(nodes)
            .enter()
            .append("g")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        let nodeCircle = node.append("circle")
            .attr("r", 1)
            .attr("stroke", "gray")
            .attr("stroke-width", "2px")
            .attr("fill", "white");


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


        let nodeImage = node.append("image")
            .attr("xlink:href", d => d.poster_path === undefined ? BROKEN_IMAGE : 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + d.poster_path)
            .attr("height", d => imageH(d))
            .attr("width", d => imageW(d))
            .attr("x", d => -(imageW(d) / 2))
            .attr("y", d => -(imageH(d) / 2))

        let texts = node.append("text")
            .style("fill", "black")
            .attr("dx", 20)
            .attr("dy", 8)
            .text(function (d) {
                return;
            });

        // make the image grow a little on mouse over and add the text details on click
        let setEvents = nodeImage
        // Append hero text
        // click on a node
            .on('click', function (d) {
                console.log(d)
                d3.select("#titlet").html(d.title);
                d3.select("#title").attr("href", '/movie/' + d.id);
                d3.select("#image").attr("src", d.poster_path === undefined ? BROKEN_IMAGE : 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + d.poster_path);
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
                    .attr("height", d => imageH(d) * 2)
                    .attr("width", d => imageW(d) * 2);
            })
            // set back
            .on('mouseleave', function () {
                d3.select(this)
                    .transition()
                    .attr("height", d => imageH(d))
                    .attr("width", d => imageW(d))
                    .attr("x", d => -(imageW(d) / 2))
                    .attr("y", d => -(imageH(d) / 2))
            });


        simulation.nodes(nodes);
        simulation.force("link")
            .links(edges);

        simulation.on("tick", function () {

            let radius = 1;

            node.attr("transform", function (d) {

                let x = Math.max(radius, Math.min(width - radius, d.x));
                let y = Math.max(radius, Math.min(height - radius, d.y));
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

        let divStyle = {
            color: '#FFF'
        };

        let headStyle = {
            padding: '40px',
            position: 'absolute',
            top: '20px',
            left: '0',
            'pointer-events': 'none'
        };

        let headStyle2 = {
            padding: '20px',
            position: 'absolute',
            top: '0',
            left: '0',

        };

        let title = {
            display: 'inline-block'
        };

        let imgStyle = {
            opacity: '0.2',
            filter: 'alpha(opacity = 50)',
            width: '50%',
            height: '50%'
        }

        let buttonStyle = {
            position: 'absolute',
            right: '10px',
            top: '10px'
        }

        return (
            this.state.loadedFavorite ? (
                this.props.auth.user !== '' ? (
                    <div>
                        <div style={headStyle2}>
                            <a id="title" href="" target="_blank"><h2 id="titlet">Click a movie!</h2></a>
                            <h3 id="desc" style={divStyle}>This visualization shows the relationships between your
                                favorited movies!</h3>
                        </div>
                        <PopUpFavPageInfo
                            username={this.props.auth.user} whatPage={"visualizationPage"}/>
                        <Button id="backButton" style={buttonStyle} onClick={() => history.push('/myfavorites')}>Back to
                            favorites</Button>
                        <header style={headStyle}>
                            <img id="image" src="" style={imgStyle}></img>
                        </header>
                        <section id="vis"></section>
                    </div>
                ) : (<h2>You Have To Be Logged In To Show This Page!</h2>)) : (<Loader/>))

    }
}

function mapStateToProps(state) {
    return {
        similarMovies: state.similarMovies.movieInfo,
        updateMoviesByGenre: state.updateMoviesByGenre,
        similarFavoriteMov: state.similarFavoriteMov,
        similarFavoriteMovStatus: state.similarFavoriteMov.fetching,
        auth: state.auth,
        loading: state.auth.loading,
        favoriteID: state.updateFavorites.favoriteID,
        favoriteIDStatus: state.updateFavorites.fetching,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getSimilarMovies: getSimilarMovies,
        getFavoriteSimilarMovies: getFavoriteSimilarMovies,
        setAuthenticated: setAuthenticated,
        notLoggedIn: notLoggedIn,
        checkFavMovieDB: checkDB
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Vis);
