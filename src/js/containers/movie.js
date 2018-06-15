import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    getMovieByMovieID,
    getTrailerByMovieID,
    getCastByMovieID,
    getSimilarMovies,
    resetSelectedValues,
    updateMovieList,
    updateCastList,
    isMovieFavorite,
    removeFavorites,
    addFavorites,
    resetIsMovieFavorite,
    clearSuggestions,
    checkLoggin
} from '../actions';
import {Loader} from '../Help Functions/loader/loader'
import MovieInfo from '../components/movieInfo';
import NavBarHeader from './navbar';
import history from "../history";
import {Glyphicon, Button} from 'react-bootstrap'
import {app, auth} from "../constants/base";

class Movie extends Component {
    constructor() {//Can have a state due to that it only handles local state
        super()
        this.state = {
            isButtonDisabled: false
        }
    }

    componentDidMount() {
        this.props.clearSuggestions();
        console.log("Check param id", this.props.match.params.id);
        this.resetValues();
        //this.props.checkLoggin();
        this.load(this.props.match.params.id)
    }

    componentWillReceiveProps(nextProps) {
        console.log("Compenent Update");
        if ((nextProps.match.params.id && this.props.match.params.id !== nextProps.match.params.id) ||
            (nextProps.auth.user && this.props.auth.user !== nextProps.auth.user)) {
            console.log("Update kan göras");
            this.resetValues();
            this.load(nextProps.match.params.id);
        }
    }

    load(paramsID) {
        const id = paramsID;
        if (auth.currentUser !== null) {
            this.props.isMovieFavoritAct(id, auth.currentUser.uid)
        }
        this.props.getSimilarMovies(id).then(() => this.props.getTrailerByMovieID(id).then(() =>
            this.props.getCastByMovieID(id).then(() => this.props.getMovieByMovieID(id))))
    }

    resetValues() {
        this.setState({
            isButtonDisabled: false
        });
        this.props.resetIsMovieFavorite();
        this.props.resetGenreValue();
        this.props.updateCastList();
        this.props.updateMovieList();
    }

    removeAddButton() {
        let movie = this.props.movieInfo.movieInfo;
        const favButton = this.props.isMovieFavorite && this.props.user !== null ? (
            <div className="removeFavButt">
                <Button onClick={() => {
                    this.setState({
                        isButtonDisabled: false
                    });
                    this.props.removeFavorites(movie.id, auth.currentUser.uid)
                }}>
                    <Glyphicon glyph="trash"/> Remove Favorite
                </Button>
            </div>
        ) : (<div className="addFavButt">
                <Button disabled={this.state.isButtonDisabled} onClick={() => {
                    this.setState({
                        isButtonDisabled: true
                    });
                    this.props.addFavorites({
                        id: movie.id, poster_path: movie.poster_path,
                        title: movie.title, release_date: movie.release_date,
                        vote_average: movie.vote_average, overview: movie.overview
                    }, auth.currentUser.uid);
                }}>
                    <Glyphicon glyph="heart"/> Add Favorite
                </Button>
            </div>
        );
        return favButton
    }

    render() {
        if (this.props.movieInfo.error !== null) {
            history.push('/APIError');
        }


        const de = (this.props.movieInfo.movieInfo.id !== undefined) ?
            (<MovieInfo movie={this.props.movieInfo.movieInfo} trailer={this.props.trailer}
                        castList={this.props.castList} similarMovies={this.props.similarMovies}
                        user={this.props.auth.user} userUID={auth.currentUser}
                        removeAddButton={this.removeAddButton()}/>)
            : (Loader());
        return (<div>
            <NavBarHeader/>
            {de}
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        movieInfo: state.movieInfo,
        trailer: state.trailer.movieInfo,
        castList: state.castList.movieInfo,
        similarMovies: state.similarMovies.movieInfo,
        isMovieFavorite: state.isMovieFav.isMovieFavorite,
        auth: state.auth
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        checkLoggin: checkLoggin,
        getMovieByMovieID: getMovieByMovieID,
        getTrailerByMovieID: getTrailerByMovieID,
        getCastByMovieID: getCastByMovieID,
        getSimilarMovies: getSimilarMovies,
        resetGenreValue: resetSelectedValues,
        updateMovieList: updateMovieList,
        updateCastList: updateCastList,
        isMovieFavoritAct: isMovieFavorite,
        removeFavorites: removeFavorites,
        addFavorites: addFavorites,
        resetIsMovieFavorite: resetIsMovieFavorite,
        clearSuggestions: clearSuggestions
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Movie);
