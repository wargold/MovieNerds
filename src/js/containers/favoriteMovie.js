import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    removeFavorites, updateMovieFavoritesSuccess, checkDB, resetSelectedValues, checkLoggin
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
        if (auth.currentUser !== null) {
            this.props.checkFavMovieDB(auth.currentUser.uid);
        }
        this.handle();
    }


    componentWillReceiveProps(nextProps) {
        if ((nextProps.favoriteID.length !== this.props.favoriteID.length) ||
            (nextProps.auth.user && this.props.auth.user !== nextProps.auth.user)) {
            this.props.checkFavMovieDB(auth.currentUser.uid);
            this.reset();
            this.setState({
                loadedFavorite: false
            });
            this.handle();
        }
    }

    handle() {
        setTimeout(() => {
            this.setState({
                loadedFavorite: true
            })
        }, 3000);
    }

    reset() {
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
        const de = this.props.auth.user !== null || this.props.auth.user === '' ? (
            this.props.favoriteID !== null && this.state.loadedFavorite && this.props.favoriteIDStatus !== false ?
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
        favoriteIDStatus: state.updateFavorites.fetching,
        loading: state.auth.loading
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        updateFavorites: updateMovieFavoritesSuccess,
        removeFavorites: removeFavorites,
        checkFavMovieDB: checkDB,
        resetGenreValue: resetSelectedValues,
        checkLoggin: checkLoggin
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(FavoriteMovies);
