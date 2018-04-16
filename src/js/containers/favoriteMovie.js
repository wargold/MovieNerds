import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    getMovieByMovieID, updateMovieFavorites
} from '../actions';
import {Image} from 'react-bootstrap';
import {LOADING_SPINNER} from '../constants/constants';
import SearchBar from './searchBar';
import MoviesByGenres from './moviesByGenres';
import {database, auth} from '../constants/base'
import {Col, Grid, Row} from 'react-bootstrap'
import MovieCardComponent from '../components/moviecards'

let movies;

class FavoriteMovies extends Component {

    componentDidMount() {
        let favs;
        movies = [];
        database.ref('users/' + auth.currentUser.uid + '/favorites').once('value').then(function (snapshot) {
            favs = snapshot.val();
        }).then(() => favs.map((id) => {
            this.loadData(id).then(() => movies.push(this.props.movieInfo))
        }));
        if (movies !== undefined) {
            this.props.updateFavorites(movies);
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

    getMovies () {
        this.props.favorites[0].map((mov)=>console.log(mov.movieInfo));
        let genre = this.props.favorites[0].map((mov) =>
            <Col xs={4} sm={3} md={2} key={mov.movieInfo.id}>
                <MovieCardComponent movie={mov.movieInfo}/>
            </Col>);

        return genre
    };


    render() {

        const de = this.props.auth.user !== '' ? (
            this.props.favorites[0] !== undefined && this.props.favorites[0].length>0 ?
          (<Grid fluid={true}>
                <h2>My Favorites Movies</h2>
                <Row>
                    {this.getMovies()}
                </Row>
            </Grid>)
            : (<Image src={LOADING_SPINNER} style={{width: 100, height: 100}}/>)):(<h2>You Have To Be Logged In To Show This Page!</h2>)
        return (<div>
            <SearchBar/>
            {this.props.selector.value.length > 0 ?
                <MoviesByGenres/>
                : de
            }
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        selector: state.selections,
        auth: state.auth,
        movieInfo: state.movieInfo,
        favorites: state.updateFavorites.movies
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getMovieByMovieID: getMovieByMovieID,
        updateFavorites: updateMovieFavorites
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(FavoriteMovies);