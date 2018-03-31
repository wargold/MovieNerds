import * as constants from '../constants/constants'

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
    let url = constants.URL_SEARCH + text + constants.API_KEY2;
    return function (dispatch) {
        dispatch(searchMovie())
        return fetch(url)
            .then(response => response.json())
            .then(json => json.results)
            .then(data => dispatch(searchMovieSuccess(text, data)))
            .catch(error => dispatch(searchMovieFAILURE(error)))
    }
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
    let url = constants.URL_DETAIL + 'popular' + constants.API_KEY1;
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
    let url = constants.URL_GENRE + 'movie/list' + constants.API_KEY1 + '&language=en-US';
    return function (dispatch) {
        dispatch(movieGenres())
        return fetch(url)
            .then(response => response.json())
            .then(json => json.genres)
            .then(data => dispatch(movieGenresSuccess(data)))
            .catch(error => dispatch(movieGenresFAILURE(error)))
    };
}

//Temporally for testing the search bar
export function search(value) {
    return {type: constants.SEARCH, value};
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

// UPDATE list of genres
export function updateGenre(data, fetchStatus) {
    return {type: constants.UPDATE_GENRES, data, fetchStatus}
}

// UPDATE list with all genres and movies
export function updateAllMoviesGenres(data) {
    console.log("Vaddddadadd");
    console.log(data);
    return {type: constants.UPDATE_ALLMOVIESBYGENRE, data}
}
