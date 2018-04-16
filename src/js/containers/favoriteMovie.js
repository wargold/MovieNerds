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
import {Col, Grid, Row, Glyphicon, Button} from 'react-bootstrap'
import MovieCardComponent from '../components/moviecards'

let movies;

class FavoriteMovies extends Component {

    componentDidMount() {
        this.handle();
    }

    componentDidUpdate(prevProps, preState) {
        if (prevProps.favoriteID.length !== this.props.favoriteID.length) {
            this.handle();
        }
    }

    handle(){
        movies = [];
        let favs=[];
        let trs=[];
        database.ref('users/' + auth.currentUser.uid + '/favorites').once('value').then(function (snapshot) {
            favs = snapshot.val();
            favs.map((id)=>trs.push(id));
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

    getMovies () {
        this.props.favorites.map((mov)=>console.log(mov.movieInfo));
        let genre = this.props.favorites.map((mov) =>
            <Col xs={4} sm={3} md={2} key={mov.movieInfo.id}>
                <div>
                <MovieCardComponent movie={mov.movieInfo}/>
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
                favs.map((id)=>trs.push(id));
                console.log(favs)
                var ref = database.ref('users/' + auth.currentUser.uid).child('favorites').set(favs);
            } else {
                console.log("Not in favs")
            }
        }).then(()=>this.props.updateFavorites(moviess, trs));
    }


    render() {
        if (this.props.favorites !== null && this.props.favorites.length>0) {
            console.log("kaddasdasdsa", this.props.favorites);
            console.log("dfffff favoriteID", this.props.favoriteID);

        }
        const de = this.props.auth.user !== '' ? (
            this.props.favorites !== null && this.props.favorites.length>0 ?
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