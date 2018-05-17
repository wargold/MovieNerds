import * as constants from '../constants/constants'
import {app, auth, database} from "../constants/base";

// Handles action for search movies api call
function searchMovie(text) {
    return {
        type: constants.FETCHING_SEARCH_MOVIE,
        text
    }
}

function searchMovieSuccess(text, data) {
    return {
        type: constants.FETCHING_SEARCH_MOVIE_SUCCESS,
        text,
        data
    }
}

function searchMovieFAILURE(error) {
    return {
        type: constants.FETCHING_SEARCH_MOVIE_FAILURE,
        error
    }
}

export function getSearchMovie(text) {
    let url = constants.URL_SEARCH + text + constants.API_KEYSEARCH;
    return function (dispatch) {
        dispatch(searchMovie(text));
        return fetch(url)
            .then(response => response.json())
            .then(json => json.results)
            .then(data => {
                if (data.length > 0) {
                    dispatch(searchMovieSuccess(text, data))
                } else {
                    dispatch(searchMovieSuccess(text, [{title: "No Result Found!"}]))
                }
            })
            .catch(error => dispatch(searchMovieFAILURE(text, error)))
    }
}

export function updateInputValue(text) {
    return {
        type: constants.UPDATE_INPUT_VALUE,
        text
    };
}

export function clearSuggestions() {
    return {
        type: constants.CLEAR_SUGGESTIONS
    };
}

// Handles action for getting popular movies api call
function popularMovies() {
    return {
        type: constants.FETCHING_POPULAR_MOVIES,
        text
    }
}

function popularMoviesSuccess(data) {
    return {
        type: constants.FETCHING_POPULAR_MOVIES_SUCCESS,
        data
    }
}

function popularMoviesFAILURE(error) {
    return {
        type: constants.FETCHING_POPULAR_MOVIES_FAILURE,
        error
    }
}

export function getPopularMovies() {
    let url = constants.URL_DETAIL + 'popular' + constants.API_KEY2;
    return function (dispatch) {
        dispatch(popularMovies())
        return fetch(url)
            .then(response => response.json())
            .then(json => json.results)
            .then(data => dispatch(popularMoviesSuccess(data)))
            .catch(error => dispatch(popularMoviesFAILURE(error)))
    }
}

// Handles action for getting movie genres api call
function movieGenres() {
    return {
        type: constants.FETCHING_GENRE
    };
}

function movieGenresSuccess(data) {
    return {
        type: constants.FETCHING_GENRE_SUCCESS,
        data
    };
}

function movieGenresFAILURE(error) {
    return {
        type: constants.FETCHING_GENRE_FAILURE,
        error
    };
}

export function getMovieGenres() {
    let url = constants.URL_GENRE + 'movie/list' + constants.API_KEY2 + '&language=en-US';
    return function (dispatch) {
        dispatch(movieGenres())
        return fetch(url)
            .then(response => response.json())
            .then(json => json.genres)
            .then(data => dispatch(movieGenresSuccess(data)))
            .catch(error => dispatch(movieGenresFAILURE(error)))
    };
}

// Handles action for getting movies for a specific genre api call
function moviesByGenre(id) {
    return {
        type: constants.FETCHING_MOVIES_BY_GENRE,
        id
    };
}

function moviesByGenreSuccess(id, data) {
    return {
        type: constants.FETCHING_MOVIES_BY_GENRE_SUCCESS,
        id,
        data
    };
}

function moviesByGenreFAILURE(error) {
    return {
        type: constants.FETCHING_MOVIES_BY_GENRE_FAILURE,
        error
    };
}

export function getMoviesByGenre(id) {
    let url = constants.URL_GENRE + id + '/movies' + constants.API_KEY2 + '&language=en-US&include_adult=false&sort_by=created_at.asc';
    return function (dispatch) {
        dispatch(moviesByGenre(id))
        return fetch(url)
            .then(response => response.json())
            .then(json => json.results)
            .then(data => dispatch(moviesByGenreSuccess(id, data)))
            .catch(error => dispatch(moviesByGenreFAILURE(error)))
    };
}

// UPDATE list with all genres and movies
export function updateAllMoviesGenres(allGenre, movieGenres) {
    return {type: constants.UPDATE_ALLMOVIESBYGENRE, allGenre, movieGenres}
}

//UPDATE value of selected genres in selection
export function updateSelectedValues(value) {
    return {type: constants.UPDATE_GENRE_SELECTION, value}
}

//UPDATE value of selected genres in selection
export function resetSelectedValues() {
    return {type: constants.RESET_GENRE_SELECTION}
}


// Handles action for getting movies by genres by the genres selected, api call
function moviesByGenres(genres) {
    return {
        type: constants.FETCHING_MOVIES_BY_GENRES,
        genres
    };
}

function moviesByGenresSuccess(genres, data) {
    return {
        type: constants.FETCHING_MOVIES_BY_GENRES_SUCCESS,
        genres, data
    };
}

function moviesByGenresFAILURE(error) {
    return {
        type: constants.FETCHING_MOVIES_BY_GENRES_FAILURE,
        error
    };
}

export function getMoviesByGenres(genres) {
    let url = constants.URL_LIST + constants.API_KEY2 + '&with_genres=' + genres;
    return function (dispatch) {
        dispatch(moviesByGenres(genres))
        return fetch(url)
            .then(response => response.json())
            .then(json => json.results)
            .then(data => dispatch(moviesByGenresSuccess(genres, data)))
            .catch(error => dispatch(moviesByGenresFAILURE(error)))
    };
}

// Handles action for getting the most popular movies, api call
function mostPopMovies() {
    return {
        type: constants.FETCHING_MOST_POPULAR_MOVIES
    };
}

function mostPopMoviesSuccess(data) {
    return {
        type: constants.FETCHING_MOST_POPULAR_MOVIES_SUCCESS, data
    };
}

function mostPopMoviesFAILURE(error) {
    return {
        type: constants.FETCHING_MOST_POPULAR_MOVIES_FAILURE,
        error
    };
}

export function getMostPopMovies() {
    let url = constants.URL_DETAIL + 'popular' + constants.API_KEY2 + '&language=en-US&page=1';
    return function (dispatch) {
        dispatch(mostPopMovies())
        return fetch(url)
            .then(response => response.json())
            .then(json => json.results)
            .then(data => dispatch(mostPopMoviesSuccess(data)))
            .catch(error => dispatch(mostPopMoviesFAILURE(error)))
    };
}

// Handles action for getting the a specific movie by movieID, api call
function movieID(id) {
    return {
        type: constants.FETCHING_MOVIEBYID,
        id
    };
}

function movieIDSuccess(id, data) {
    return {
        type: constants.FETCHING_MOVIEBYID_SUCCESS, id, data
    };
}

function movieIDFAILURE(error) {
    return {
        type: constants.FETCHING_MOVIEBYID_FAILURE,
        error
    };
}

export function getMovieByMovieID(id) {
    let url = constants.URL_DETAIL + id + constants.API_KEY1 + '&language=en-US';
    return function (dispatch) {
        dispatch(movieID(id))
        return fetch(url)
            .then(response => response.json())
            .then(data => dispatch(movieIDSuccess(id, data)))
            .catch(error => dispatch(movieIDFAILURE(error)))
    };
}

// Handles action for getting a trailer for a movie by movieID, api call
function trailerByMovieID(id) {
    return {
        type: constants.FETCHING_MOVIETRAILER,
        id
    };
}

function trailerByMovieIDSuccess(id, data) {
    return {
        type: constants.FETCHING_MOVIETRAILER_SUCCESS, id, data
    };
}

function trailerByMovieIDFAILURE(error) {
    return {
        type: constants.FETCHING_MOVIETRAILER_FAILURE,
        error
    };
}

export function getTrailerByMovieID(id) {
    let url = constants.URL_DETAIL + id + constants.URL_VIDEO + constants.API_KEY1 + '&language=en-US';
    return function (dispatch) {
        dispatch(trailerByMovieID(id))
        return fetch(url)
            .then(response => response.json())
            .then(json => json.results)
            .then(data => dispatch(trailerByMovieIDSuccess(id, data)))
            .catch(error => dispatch(trailerByMovieIDFAILURE(error)))
    };
}

// Handles action for getting a cast members for a movie by movieID, api call
function castByMovieID(id) {
    return {
        type: constants.FETCHING_CAST,
        id
    };
}

function castByMovieIDSuccess(id, data) {
    return {
        type: constants.FETCHING_CAST_SUCCESS, id, data
    };
}

function castByMovieIDFAILURE(error) {
    return {
        type: constants.FETCHING_CAST_FAILURE,
        error
    };
}

export function getCastByMovieID(id) {
    let url = constants.URL_DETAIL + id + constants.CAST_CREDIT + constants.API_KEY1;
    return function (dispatch) {
        dispatch(castByMovieID(id))
        return fetch(url)
            .then(response => response.json())
            .then(json => json.cast)
            .then(data => dispatch(castByMovieIDSuccess(id, data)))
            .catch(error => dispatch(castByMovieIDFAILURE(error)))
    };
}

// Handles action for getting information about a cast member for a movie by ID, api call
function castInfoByID(id) {
    return {
        type: constants.FETCHING_CASTBYID,
        id
    };
}

function castInfoByIDSuccess(id, data) {
    return {
        type: constants.FETCHING_CASTBYID_SUCCESS, id, data
    };
}

function castInfoByIDFAILURE(error) {
    return {
        type: constants.FETCHING_CASTBYID_FAILURE,
        error
    };
}

export function getCastInfoByID(id) {
    let url = constants.URL_PERSON + id + constants.API_KEY1;
    return function (dispatch) {
        dispatch(castInfoByID(id))
        return fetch(url)
            .then(response => response.json())
            .then(data => dispatch(castInfoByIDSuccess(id, data)))
            .catch(error => dispatch(castInfoByIDFAILURE(error)))
    };
}

// Handles action for getting information about a movies a cast member is known for by ID, api call
function castKnownMovies(id) {
    return {
        type: constants.FETCHING_CAST_KNOWN_MOVIES,
        id
    };
}

function castKnownMoviesSuccess(id, data) {
    return {
        type: constants.FETCHING_CAST_KNOWN_MOVIES_SUCCESS, id, data
    };
}

function castKnownMoviesFAILURE(error) {
    return {
        type: constants.FETCHING_CAST_KNOWN_MOVIES_FAILURE,
        error
    };
}

export function getCastKnownMovies(id) {
    let url = constants.URL_PERSON + id + constants.MOVIE_CREDIT + constants.API_KEY1 + '&language=en-US';
    return function (dispatch) {
        dispatch(castKnownMovies(id))
        return fetch(url)
            .then(response => response.json())
            .then(json => json.cast)
            .then(data => dispatch(castKnownMoviesSuccess(id, data)))
            .catch(error => dispatch(castKnownMoviesFAILURE(error)))
    };
}

// Handles action for getting similar movies to a movie by ID, api call
function similarMovies(id) {
    return {
        type: constants.FETCHING_SIMILAR_MOVIES,
        id
    };
}

function similarMoviesSuccess(id, data) {
    return {
        type: constants.FETCHING_SIMILAR_MOVIES_SUCCESS, id, data
    };
}

function similarMoviesFAILURE(error) {
    return {
        type: constants.FETCHING_SIMILAR_MOVIES_FAILURE,
        error
    };
}

export function getSimilarMovies(id) {
    let url = constants.URL_DETAIL + id + constants.SIMILAR + constants.API_KEY1 + '&language=en-US&page=1';
    return function (dispatch) {
        dispatch(similarMovies(id))
        return fetch(url)
            .then(response => response.json())
            .then(json => json.results)
            .then(data => dispatch(similarMoviesSuccess(id, data)))
            .catch(error => dispatch(similarMoviesFAILURE(error)))
    };
}

export function setAuthenticated(user) {
    return async function (dispatch) {
        await dispatch(facebookLoginSuccess(user))
    }
}

function facebookLoginSuccess(user) {
    return {
        type: constants.AUTH_FACEBOOK_SUCCESS, user
    };
}

export function logout() {
    return {
        type: constants.AUTH_LOGOUT
    }
}

export function notLoggedIn() {
    return {
        type: constants.AUTH_UNREGISTERED
    }
}

// UPDATE list with all genres and movies
export function updateMovieFavorites() {
    return {type: constants.UPDATE_FAVORITE_MOVIE}
}

export function updateMovieFavoritesSuccess(favoriteMovies, favoriteIDs) {
    return {type: constants.UPDATE_FAVORITE_MOVIE_SUCCESS, favoriteMovies, favoriteIDs}
}

export function updateMovieFavorites_FAILURE(error) {
    return {type: constants.UPDATE_FAVORITE_MOVIE_FAILURE, error}
}


// UPDATE cast and movie list on update
export function updateMovieList() {
    return {type: constants.UPDATE_MOVIELIST}
}

export function updateCastList() {
    return {type: constants.UPDATE_CASTLIST}
}

// GET ALL MOVIES BY GENRES

function loadedAllMovies() {
    return {
        type: constants.LOADED_ALL_MOVIES
    };
}

function loadedAllMoviesSuccess(moviesByGenres) {
    return {
        type: constants.LOADED_ALL_MOVIES_SUCCESS, moviesByGenres
    };
}

function loadedAllMoviesFailure(error) {
    return {
        type: constants.LOADED_ALL_MOVIES_FAILURE, error
    };
}

export function getLoadedAllMoviesSucces() {
    return async function (dispatch) {
        dispatch(loadedAllMovies());
        let moviesByGen = [];
        await dispatch(getMovieGenres()).then(data => {
            return Promise.all([data.data.map(async (i) => {
                await dispatch(getMoviesByGenre(i.id)).then(async (movieGenre) => await moviesByGen.push({
                    name: i.name,
                    data: movieGenre.data
                }));
            })])
        }).catch(error => dispatch(loadedAllMoviesFailure(error)));
        setTimeout(() => {
            dispatch(loadedAllMoviesSuccess(moviesByGen))
        }, 2000);
    }
}


// GET ALL MOVIES BY A USERS FAVORITE MOVIE LIST

function loadFavoriteSimilarMovies() {
    return {
        type: constants.LOAD_FAVORITE_SIMILAR_MOVIES
    };
}

function loadFavoriteSimilarMoviesSuccess(simFavMovies) {
    return {
        type: constants.LOAD_FAVORITE_SIMILAR_MOVIES_SUCCESS, simFavMovies
    };
}

function loadFavoriteSimilarMoviesFailure(error) {
    return {
        type: constants.LOAD_FAVORITE_SIMILAR_MOVIES_FAILURE, error
    };
}

export function getFavoriteSimilarMovies(list) {
    return async function (dispatch) {
        dispatch(loadFavoriteSimilarMovies());
        let similarFavMovies = [];
        await Promise.all([list.map(async (movieID) => await dispatch(getSimilarMovies(movieID.id)).then(async (similarMovies) =>
            await similarFavMovies.push({
                FavMovieID: movieID,
                data: similarMovies.data
            })).catch(error => dispatch(loadFavoriteSimilarMoviesFailure(error))))]);
        setTimeout(() => {
            dispatch(loadFavoriteSimilarMoviesSuccess(similarFavMovies))
        }, 500);
    }
}

// Actions for user data

export function addFavorites(movie, uid) {
    let favs = [];
    return async function (dispatch) {
        dispatch(updateMovieFavorites())
        database.ref('users/' + uid + '/favorites').once('value').then(function (snapshot) {
            favs = snapshot.val()
            if (favs !== null && favs.some(item => {
                    if (item.movieID === parseInt(movie.id)) {
                        return true
                    } else {
                        return false
                    }
                })) {
                console.log("Already favorited")
            } else {
                if (favs === null) {
                    favs = [];
                }
                favs.push(movie);
                console.log("addFavorites", favs);
                var ref = database.ref('users/' + uid).child('favorites').set(favs);
            }
        }).then(() => {
            dispatch(updateMovieFavoritesSuccess(favs, favs));
            dispatch(movieFavorite(true));
        })
    }
}

export function removeFavorites(id, uid) {
    let trs = [];
    let moviess = [];
    let removeIndex = [];
    return async function (dispatch) {
        dispatch(updateMovieFavorites())
        database.ref('users/' + uid + '/favorites').once('value').then(function (snapshot) {
            var favs = snapshot.val()
            if (favs !== null && favs.some(item => {
                    console.log("dfdfgd1 item.id", item.id)
                    console.log("dfdfgd2 id", id)
                    if (item.id === id) {
                        return true
                    } else {
                        return false
                    }
                })) {
                var index = favs.some((item, i) => {
                    if (item.id === id) {
                        console.log("kolla remove iiii", i)
                        removeIndex = i;
                        return i
                    }
                })
                if (index > -1) {
                    console.log("kolla remove index", index, removeIndex)
                    favs.splice(removeIndex, 1);
                }
                favs.map((id) => trs.push(id));
                console.log(favs)
                var ref = database.ref('users/' + uid).child('favorites').set(favs);
                dispatch(updateMovieFavoritesSuccess(moviess, trs));
                dispatch(movieFavorite(false));
            } else {
                console.log("Not in favs")
            }
        })
    }
}

export function checkDB(uid) {
    let movies = [];
    let favs = [];
    let trs = [];
    return async function (dispatch) {
        dispatch(updateMovieFavorites())
        database.ref('users/' + uid + '/favorites').once('value').then(function (snapshot) {
            console.log("snapshot.val()", snapshot.val());
            if (snapshot.val() !== null) {
                favs = snapshot.val();
                favs.map((id) => trs.push(id));
            }
        }).catch(error => dispatch(updateMovieFavorites_FAILURE(error)));
        if (movies !== undefined) {
            console.log("dfdsfds", trs);
            dispatch(updateMovieFavoritesSuccess(movies, trs));
        }
    }
}

function movieFavorite(bool) {
    return {
        type: constants.CHECK_IF_MOVIE_FAVORITE, bool
    };
}

function movieFavoriteFailure(error) {
    return {
        type: constants.CHECK_IF_MOVIE_FAVORITE_FAILURE, error
    };
}

export function isMovieFavorite(movieID, uid) {
    return async function (dispatch) {
        database.ref('users/' + uid + '/favorites').once('value').then(function (snapshot) {
            var favs = snapshot.val()
            if (favs !== null && favs.some(item => {
                    console.log("dfdfgd1", item.id)
                    console.log("dfdfgd2", parseInt(movieID))
                    if (item.id === parseInt(movieID)) {
                        console.log("dfdfgd3", true)
                        return true
                    } else {
                        return false
                    }
                })) {
                console.log("-----IS FAV")
                console.log("dfdfgd3", true)
                dispatch(movieFavorite(true))
            }
        }).catch(error => dispatch(movieFavoriteFailure(error)));
    }
}

export function resetIsMovieFavorite() {
    return async function (dispatch) {
        dispatch(movieFavorite(false))
    }
}

export function checkLoggin() {
    return function (dispatch) {
        app.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("logged in", user.displayName)
                if (user.displayName === null) {
                    dispatch(setAuthenticated(user.email));
                } else {
                    dispatch(setAuthenticated(user.displayName));
                }

            } else {
                console.log("not logged in")
                dispatch(this.props.notLoggedIn());
            }
        })
    }
}
