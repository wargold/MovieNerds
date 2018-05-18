import {
    UPDATE_FAVORITE_MOVIE_SUCCESS, UPDATE_FAVORITE_MOVIE_FAILURE, UPDATE_FAVORITE_MOVIE
} from "../constants/constants";

const initialState = {
    movies: [],
    favoriteID: [],
    fetching: false,
    genres: [],
    error: null
}


export const UpdateFavoriteMovies = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_FAVORITE_MOVIE:
            return {
                ...state, fetching: false, movies: [], favoriteID: [], genres: []
            };
        case UPDATE_FAVORITE_MOVIE_SUCCESS:
            return {
                ...state,
                movies: action.favoriteMovies, favoriteID: action.favoriteIDs, genres: [], fetching: true
            };
        case UPDATE_FAVORITE_MOVIE_FAILURE:
            return {
                ...state, error: action.error, fetching: true
            };
        default:
            return state;
    }
};
