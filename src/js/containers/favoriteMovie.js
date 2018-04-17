import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    getMovieByMovieID, updateMovieFavorites
} from '../actions';
import { Image } from 'react-bootstrap';
import { LOADING_SPINNER } from '../constants/constants';
import SearchBar from './searchBar';
import MoviesByGenres from './moviesByGenres';
import { database, auth } from '../constants/base'
import { Col, Grid, Row, Glyphicon, Button } from 'react-bootstrap'
import MovieCardComponent from '../components/moviecards'
import * as d3 from "d3";

let movies;

class FavoriteMovies extends Component {



    componentDidMount() {
        this.handle();

        var width = 900;
        var height = 600;

        var svg = d3.select("#vis")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("border-style", "solid");;

        var fav = [{
            "id": "fav1",
            "poster_path": "/pQPRp30zd0BSaefterJnLmh4Rs9.jpg",
            "fav": 1
        },
        {
            "id": "fav2",
            "poster_path": "/5T8VvuFTdaawKLJk34i69Utaw7o.jpg",
            "fav": 1
        }]

        var simi = [
            [


                {
                    "adult": false,
                    "backdrop_path": "/nriBinb7Y3Bm6LdbmOC0mFxSm8d.jpg",
                    "genre_ids": [
                        80,
                        18
                    ],
                    "id": 226,
                    "original_language": "en",
                    "original_title": "Boys Don't Cry",
                    "overview": "Female born, Teena Brandon adopts his male identity of Brandon Teena and attempts to find himself and love in Nebraska.",
                    "release_date": "1999-09-02",
                    "poster_path": "/6bqIZTEuJnUrgnxcymciszvOz8J.jpg",
                    "popularity": 15.018448,
                    "title": "Boys Don't Cry",
                    "video": false,
                    "vote_average": 7.3,
                    "vote_count": 468
                },
                {
                    "adult": false,
                    "backdrop_path": "/pQPRp30zd0BSaefterJnLmh4Rs9.jpg",
                    "genre_ids": [
                        16,
                        35,
                        10751,
                        14
                    ],
                    "id": 76492,
                    "original_language": "en",
                    "original_title": "Hotel Transylvania",
                    "overview": "Welcome to Hotel Transylvania, Dracula's lavish five-stake resort, where monsters and their families can live it up and no humans are allowed. One special weekend, Dracula has invited all his best friends to celebrate his beloved daughter Mavis's 118th birthday. For Dracula catering to all of these legendary monsters is no problem but the party really starts when one ordinary guy stumbles into the hotel and changes everything!",
                    "release_date": "2012-09-20",
                    "poster_path": "/9qugesYpAWHUpdrw2w8URSGkAPt.jpg",
                    "popularity": 14.229483,
                    "title": "Hotel Transylvania",
                    "video": false,
                    "vote_average": 6.8,
                    "vote_count": 3254
                },
                {
                    "adult": false,
                    "backdrop_path": "/gkbtPw5gyp8exaKw4zXEyH33J1m.jpg",
                    "genre_ids": [
                        18
                    ],
                    "id": 153,
                    "original_language": "en",
                    "original_title": "Lost in Translation",
                    "overview": "Two lost souls visiting Tokyo -- the young, neglected wife of a photographer and a washed-up movie star shooting a TV commercial -- find an odd solace and pensive freedom to be real in each other's company, away from their lives in America.",
                    "release_date": "2003-08-31",
                    "poster_path": "/5T8VvuFTdaawKLJk34i69Utaw7o.jpg",
                    "popularity": 19.759603,
                    "title": "Lost in Translation",
                    "video": false,
                    "vote_average": 7.3,
                    "vote_count": 2390
                },
                {
                    "adult": false,
                    "backdrop_path": "/zy5hyStEkQyjZgYtvKzJQBr7MpJ.jpg",
                    "genre_ids": [
                        53,
                        18,
                        36
                    ],
                    "id": 97630,
                    "original_language": "en",
                    "original_title": "Zero Dark Thirty",
                    "overview": "A chronicle of the decade-long hunt for al-Qaeda terrorist leader Osama bin Laden after the September 2001 attacks, and his death at the hands of the Navy S.E.A.L. Team 6 in May, 2011.",
                    "release_date": "2012-12-19",
                    "poster_path": "/yg6IDNucLAEj7E5loTyTnUW2pgb.jpg",
                    "popularity": 32.921756,
                    "title": "Zero Dark Thirty",
                    "video": false,
                    "vote_average": 6.7,
                    "vote_count": 2028
                },
                {
                    "adult": false,
                    "backdrop_path": "/s2bT29y0ngXxxu2IA8AOzzXTRhd.jpg",
                    "genre_ids": [
                        28,
                        53,
                        878,
                        9648,
                        12
                    ],
                    "id": 27205,
                    "original_language": "en",
                    "original_title": "Inception",
                    "overview": "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
                    "release_date": "2010-07-14",
                    "poster_path": "/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
                    "popularity": 63.620734,
                    "title": "Inception",
                    "video": false,
                    "vote_average": 8.2,
                    "vote_count": 16882
                },
                {
                    "adult": false,
                    "backdrop_path": "/xzXPybvwRXGIU5Bbw68YHVkTUW2.jpg",
                    "genre_ids": [
                        35,
                        18
                    ],
                    "id": 427900,
                    "original_language": "en",
                    "original_title": "Home Again",
                    "overview": "Life for a single mom in Los Angeles takes an unexpected turn when she allows three young guys to move in with her.",
                    "release_date": "2017-09-07",
                    "poster_path": "/pE4VHzhDZgvbx2QOllaXXPADiW1.jpg",
                    "popularity": 12.976991,
                    "title": "Home Again",
                    "video": false,
                    "vote_average": 5.7,
                    "vote_count": 313
                }

            ],
            [
                {
                    "adult": false,
                    "backdrop_path": "/zBB1mzmqnUuSrlTuf0SFFlI1EoJ.jpg",
                    "genre_ids": [
                        18
                    ],
                    "id": 244772,
                    "original_language": "en",
                    "original_title": "The Skeleton Twins",
                    "overview": "Estranged twins Maggie and Milo coincidentally cheat death on the same day, prompting them to reunite and confront the reasons their lives went so wrong. As the twins' reunion reinvigorates them, they realize the key to fixing their lives may just lie in repairing their relationship.",
                    "release_date": "2014-01-18",
                    "poster_path": "/vvmv1R2jDXJeeeyYcGg0ypXc2XK.jpg",
                    "popularity": 11.353569,
                    "title": "The Skeleton Twins",
                    "video": false,
                    "vote_average": 6.7,
                    "vote_count": 339
                },
                {
                    "adult": false,
                    "backdrop_path": "/s2bT29y0ngXxxu2IA8AOzzXTRhd.jpg",
                    "genre_ids": [
                        28,
                        53,
                        878,
                        9648,
                        12
                    ],
                    "id": 27205,
                    "original_language": "en",
                    "original_title": "Inception",
                    "overview": "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
                    "release_date": "2010-07-14",
                    "poster_path": "/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
                    "popularity": 63.620734,
                    "title": "Inception",
                    "video": false,
                    "vote_average": 8.2,
                    "vote_count": 16882
                },
                {
                    "adult": false,
                    "backdrop_path": "/xzXPybvwRXGIU5Bbw68YHVkTUW2.jpg",
                    "genre_ids": [
                        35,
                        18
                    ],
                    "id": 427900,
                    "original_language": "en",
                    "original_title": "Home Again",
                    "overview": "Life for a single mom in Los Angeles takes an unexpected turn when she allows three young guys to move in with her.",
                    "release_date": "2017-09-07",
                    "poster_path": "/pE4VHzhDZgvbx2QOllaXXPADiW1.jpg",
                    "popularity": 12.976991,
                    "title": "Home Again",
                    "video": false,
                    "vote_average": 5.7,
                    "vote_count": 313
                },
                {
                    "adult": false,
                    "backdrop_path": "/h64zNCm5SrY45c7Z6gxy9tC0xb.jpg",
                    "genre_ids": [
                        35,
                        10749,
                        18
                    ],
                    "id": 634,
                    "original_language": "en",
                    "original_title": "Bridget Jones's Diary",
                    "overview": "A chaotic Bridget Jones meets a snobbish lawyer, and he soon enters her world of imperfections.",
                    "release_date": "2001-04-13",
                    "poster_path": "/ym6kjFFZg6boC0QHBVw6hqJLbxv.jpg",
                    "popularity": 24.052895,
                    "title": "Bridget Jones's Diary",
                    "video": false,
                    "vote_average": 6.6,
                    "vote_count": 1838
                },
                {
                    "adult": false,
                    "backdrop_path": "/1ytaxWeVHDYtb7KPkrn3GNtDJdF.jpg",
                    "genre_ids": [
                        18
                    ],
                    "id": 376867,
                    "original_language": "en",
                    "original_title": "Moonlight",
                    "overview": "The tender, heartbreaking story of a young man’s struggle to find himself, told across three defining chapters in his life as he experiences the ecstasy, pain, and beauty of falling in love, while grappling with his own sexuality.",
                    "release_date": "2016-10-21",
                    "poster_path": "/qAwFbszz0kRyTuXmMeKQZCX3Q2O.jpg",
                    "popularity": 28.823359,
                    "title": "Moonlight",
                    "video": false,
                    "vote_average": 7.3,
                    "vote_count": 2644
                },
                {
                    "adult": false,
                    "backdrop_path": "/tHw2nN118rSPIFDD80NwWtWGMyO.jpg",
                    "genre_ids": [
                        18,
                        12
                    ],
                    "id": 468,
                    "original_language": "en",
                    "original_title": "My Own Private Idaho",
                    "overview": "In this loose adaptation of Shakespeare's \"Henry IV,\" Mike Waters (River Phoenix) is a gay hustler afflicted with narcolepsy. Scott Favor (Keanu Reeves) is the rebellious son of a mayor. Together, the two travel from Portland, Oregon to Idaho and finally to the coast of Italy in a quest to find Mike's estranged mother. Along the way they turn tricks for money and drugs, eventually attracting the attention of a wealthy benefactor and sexual deviant.",
                    "release_date": "1991-09-29",
                    "poster_path": "/2AzIv2b6mI2Ye4uJUTdi4wjIvLb.jpg",
                    "popularity": 13.845469,
                    "title": "My Own Private Idaho",
                    "video": false,
                    "vote_average": 7.1,
                    "vote_count": 286
                }
            ]

        ]

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
            return 60;
        }

        var simulation = d3.forceSimulation()
            .force("link", d3.forceLink().distance(distance()).strength(0.1))
            .force("charge", d3.forceManyBody().strength(-50))
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

        var nodeImage = node.append("image")
            .attr("xlink:href", d => 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + d.poster_path)
            .attr("height", "40")
            .attr("width", "40")
            .attr("x", -20)
            .attr("y", -20)

        var texts = node.append("text")
            .style("fill", "black")
            .attr("dx", 20)
            .attr("dy", 8)
            .text(function (d) {
                return d.id;
            });

        // make the image grow a little on mouse over and add the text details on click
        var setEvents = nodeImage
            // Append hero text
            // click on a node
            .on('click', function (d) {
                console.log(d)
                d3.select("#desc").html(d.title);

            })
            .on('mouseenter', function () {
                // select element in current context
                d3.select(this)
                    .transition()
                    .attr("x", function (d) {
                        return -60;
                    })
                    .attr("y", function (d) {
                        return -60;
                    })
                    .attr("height", 100)
                    .attr("width", 100);
            })
            // set back
            .on('mouseleave', function () {
                d3.select(this)
                    .transition()
                    .attr("x", function (d) {
                        return -25;
                    })
                    .attr("y", function (d) {
                        return -25;
                    })
                    .attr("height", 50)
                    .attr("width", 50);
            });


        simulation.nodes(nodes);
        simulation.force("link")
            .links(edges);

        simulation.on("tick", function () {


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
                })

            node.attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")


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
    }

    componentDidUpdate(prevProps, preState) {
        if (prevProps.favoriteID.length !== this.props.favoriteID.length) {
            this.handle();
        }
    }

    handle() {
        movies = [];
        let favs = [];
        let trs = [];
        database.ref('users/' + auth.currentUser.uid + '/favorites').once('value').then(function (snapshot) {
            favs = snapshot.val();
            favs.map((id) => trs.push(id));
        }).then(() => favs.map((id) => {
            this.loadData(id).then(() => movies.push(this.props.movieInfo))
        }));
        if (movies !== undefined) {
            console.log("dfdsfds", trs);
            this.props.updateFavorites(movies, trs);
        }
    }

    loadData(id) {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.props.getMovieByMovieID(id));
            }, 3000);
        });
        return promise;
    }

    getMovies() {
        this.props.favorites.map((mov) => console.log(mov.movieInfo));
        let genre = this.props.favorites.map((mov) =>
            <Col xs={4} sm={3} md={2} key={mov.movieInfo.id}>
                <div>
                    <MovieCardComponent movie={mov.movieInfo} />
                    <Button onClick={() => { this.removeFavorite(mov.movieInfo.id) }}>
                        <Glyphicon glyph="trash" /> Remove Favorite
                    </Button>
                </div>
            </Col>);

        return genre
    };

    removeFavorite(id) {
        let trs = [];
        let moviess = [];
        database.ref('users/' + auth.currentUser.uid + '/favorites').once('value').then(function (snapshot) {
            var favs = snapshot.val()
            if (favs !== null && favs.includes(id)) {
                var index = favs.indexOf(id);
                if (index > -1) {
                    favs.splice(index, 1);
                }
                favs.map((id) => trs.push(id));
                console.log(favs)
                var ref = database.ref('users/' + auth.currentUser.uid).child('favorites').set(favs);
            } else {
                console.log("Not in favs")
            }
        }).then(() => this.props.updateFavorites(moviess, trs));
    }




    render() {
        if (this.props.favorites !== null && this.props.favorites.length > 0) {
            console.log("kaddasdasdsa", this.props.favorites);
            console.log("dfffff favoriteID", this.props.favoriteID);

        }
        const de = this.props.auth.user !== '' ? (
            this.props.favorites !== null && this.props.favorites.length > 0 ?
                (<Grid fluid={true}>
                    <h2>My Favorites Movies</h2>
                    <Row>
                        {this.getMovies()}
                    </Row>
                </Grid>)
                : (<Image src={LOADING_SPINNER} style={{ width: 100, height: 100 }} />)) : (<h2>You Have To Be Logged In To Show This Page!</h2>)
        return (<div>
            <SearchBar />
            {this.props.selector.value.length > 0 ?
                <MoviesByGenres />
                : de
            }
            <h2 id="desc">Click to view their identity</h2>
            <section id="vis"></section>
        </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        selector: state.selections,
        auth: state.auth,
        movieInfo: state.movieInfo,
        favorites: state.updateFavorites.movies,
        favoriteID: state.updateFavorites.favoriteID

    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getMovieByMovieID: getMovieByMovieID,
        updateFavorites: updateMovieFavorites
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(FavoriteMovies);