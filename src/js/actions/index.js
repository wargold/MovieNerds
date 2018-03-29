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
    let url = constants.URL_SEARCH + text + constants.API_KEY1;
    return function (dispatch) {
        dispatch(searchMovie())
        return fetch(url)
            .then(response => response.json())
            .then(json => json.results)
            .then(data => dispatch(searchMovieSuccess(data, text)))
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
    let url = constants.URL_GENRE + constants.API_KEY1 + '&language=en-US';
    return function (dispatch) {
        dispatch(movieGenres())
        return fetch(url)
            .then(response => response.json())
            .then(json => json.genres)
            .then(data => dispatch(movieGenresSuccess(data)))
            .catch(error => dispatch(movieGenresFAILURE(error)))
    };
}

export function search(value) {
    return {type: constants.SEARCH, value};
}