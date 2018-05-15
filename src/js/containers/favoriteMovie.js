import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    removeFavorites, setAuthenticated, notLoggedIn, updateMovieFavorites, checkDB, resetSelectedValues
} from '../actions';
import {auth, app} from '../constants/base'
import {Col, Grid, Row, Glyphicon, Button, Table, thead, th, OverlayTrigger, Popover} from 'react-bootstrap'
import MovieCardComponent from '../components/moviecards'
import {Loader} from '../../loader/loader'
import history from "../history";
import NavBarHeader from './navbar';
import './css/favoriteMovie.css'

class FavoriteMovies extends Component {
    constructor() {//Can have a state due to that it only handles local state
        super()
        this.state = {
            loadedFavorite: false
        }
    }

    componentDidMount() {
        this.reset();
        setTimeout(() => {
                this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
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
                    this.handle();
                })
            }, 1750
        )
    }

    componentDidUpdate(prevProps, preState) {
        if (prevProps.favoriteID.length !== this.props.favoriteID.length) {
            this.reset();
            this.setState({
                loadedFavorite: false
            });
            this.handle();
        }
    }

    handle() {
        this.props.checkFavMovieDB(auth.currentUser.uid);
        setTimeout(() => {
            this.setState({
                loadedFavorite: true
            })
        }, 500);
    }

    reset(){
        this.props.resetGenreValue();
    }

    getMovies() {
        this.props.favoriteID.map((mov) => console.log("123456", mov));
        let genre = this.props.favoriteID.map((mov) =>
            <Col xs={12} sm={4} md={3} key={mov.id}>
                <div className="relatedamoviepic">
                    <div className="justRelatedaMoviePic">
                        <MovieCardComponent movie={mov}/>
                    </div>
                    <Button id="removeButton" onClick={() => {
                        this.props.removeFavorites(mov.id, auth.currentUser.uid)
                    }}>
                        <Glyphicon glyph="trash"/> Remove Favorite
                    </Button>
                </div>
            </Col>);

        return genre
    };

    render() {
        if (this.props.movieInfo.error !== null) {
            history.push('/APIError');
        }
        const de = this.props.auth.user !== null || this.props.auth.user===''? (
            this.props.favoriteID !== null && this.state.loadedFavorite ?
                (<Grid fluid={true}>
                        <Table id="dwds">
                            <thead>
                            <th><h2 id="favTitle">My Favorite Movies</h2></th>
                            <th>{this.props.favoriteID.length > 0 ?
                                <OverlayTrigger
                                    trigger={['hover', 'focus']}
                                    placement="bottom"
                                    overlay={popoverHoverFocus}
                                >
                                    <Button id="visualButt" onClick={() => history.push('/vis')}>Visualisation</Button>
                                </OverlayTrigger> : <h2/>}
                            </th>
                            </thead>
                        </Table>
                        <Row>
                            {this.props.favoriteID.length > 0 ?
                                this.getMovies() : <h2 id="noFavMovie">No Movies In Your Favorite List</h2>
                            }
                        </Row>
                    </Grid>
                )
                : (Loader())) : (
            <h2 id="notLoggedIn"> You Have To Be Logged In To Show This Page!</h2>
        )
        return (
            <div>
                <NavBarHeader/>
                {de}
            </div>

        )
    }
}

const popoverHoverFocus = (
    <Popover id="popover-trigger-hover-focus">
        Discover new movies based on your favorites,
        <i>(note: Favorites connect to each other if they have common similar movies)</i>
    </Popover>
);

function mapStateToProps(state) {
    return {
        auth: state.auth,
        movieInfo: state.movieInfo,
        favorites: state.updateFavorites.movies,
        favoriteID: state.updateFavorites.favoriteID,
        loading: state.auth.loading
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setAuthenticated: setAuthenticated,
        notLoggedIn: notLoggedIn,
        updateFavorites: updateMovieFavorites,
        removeFavorites: removeFavorites,
        checkFavMovieDB: checkDB,
        resetGenreValue: resetSelectedValues
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(FavoriteMovies);
