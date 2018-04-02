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
    let url = constants.URL_SEARCH + text + constants.API_KEYSEARCH;
    return function (dispatch) {
        dispatch(searchMovie(text));
        return fetch(url)
            .then(response => response.json())
            .then(json => json.results)
            .then(data => dispatch(searchMovieSuccess(text, data)))
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




// Handles action for getting movies by genres by the genres selected, api call
function moviesByGenres(genres) {
    return {
        type: constants.FETCHING_MOVIES_BY_GENRES,
        genres
    };
}

function moviesByGenresSuccess(genres,data) {
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
    let url = constants.URL_LIST + constants.API_KEY2 + '&with_genres='+genres;
    return function (dispatch) {
        dispatch(moviesByGenres(genres))
        return fetch(url)
            .then(response => response.json())
            .then(json => json.results)
            .then(data => dispatch(moviesByGenresSuccess(genres,data)))
            .catch(error => dispatch(moviesByGenresFAILURE(error)))
    };
}