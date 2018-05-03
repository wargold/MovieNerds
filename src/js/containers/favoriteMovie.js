import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    getMovieByMovieID, updateMovieFavorites, setAuthenticated, notLoggedIn
} from '../actions';
import {database, auth, app, base } from '../constants/base'
import {Col, Grid, Row, Glyphicon, Button} from 'react-bootstrap'
import MovieCardComponent from '../components/moviecards'
import {Loader} from '../../loader/loader'
import history from "../history";
import NavBarHeader from './navbar';

let movies;

class FavoriteMovies extends Component {
    constructor() {//Can have a state due to that it only handles local state about a image...
        super()
        this.state = {
            loadedFavorite: false
        }
    }

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
        })

    }

    componentDidUpdate(prevProps, preState) {
        if (prevProps.favoriteID.length !== this.props.favoriteID.length) {
            this.setState({
                loadedFavorite: false
            });
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
        });
        if (movies !== undefined) {
            console.log("dfdsfds", trs);
            this.props.updateFavorites(movies, trs);
        }
        setTimeout(() => {
            this.setState({
                loadedFavorite: true
            })
        }, 3500);
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
        this.props.favoriteID.map((mov) => console.log("123456", mov));
        let genre = this.props.favoriteID.map((mov) =>
            <Col xs={4} sm={3} md={2} key={mov.id}>
                <div>
                    <MovieCardComponent movie={mov}/>
                    <Button onClick={() => {
                        this.removeFavorite(mov.id)
                    }}>
                        <Glyphicon glyph="trash"/> Remove Favorite
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
            if (favs !== null && favs.some(item => {
                    if (item.id === id) {
                        return true
                    } else {
                        return false
                    }
                })) {
                var index = favs.some((item, i) => {
                    if (item.id === id) {
                        return i
                    }
                })
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
        if (this.props.favorites !== null && this.state.loadedFavorite) {
            console.log("kaddasdasdsa", this.props.favorites);
            console.log("dfffff favoriteID", this.props.favoriteID);

        }
        const de = this.props.auth.user !== '' ? (
            this.props.favoriteID !== null && this.state.loadedFavorite ?
                (<Grid fluid={true}>
                    <h2>My Favorites Movies</h2>
                    {this.props.favoriteID.length > 0? <Button onClick={()=>history.push('/vis')}>Visualisation</Button>: <h2>s</h2>}
                    <Row>
                        {this.props.favoriteID.length > 0 ?
                            this.getMovies() : <h2>No Movies In Your Favorite List</h2>
                        }
                    </Row>
                </Grid>)
                : (Loader())) : (<h2>You Have To Be Logged In To Show This Page!</h2>)
        return (<div>
                <NavBarHeader/>
                {de}
                {/* <h2 id="desc">Click to view their identity</h2>
                <section id="vis"></section> */}
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
        favoriteID: state.updateFavorites.favoriteID,
        loading: state.auth.loading

    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getMovieByMovieID: getMovieByMovieID,
        updateFavorites: updateMovieFavorites,
        setAuthenticated: setAuthenticated,
        notLoggedIn: notLoggedIn
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(FavoriteMovies);
