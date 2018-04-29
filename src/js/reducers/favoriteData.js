import {
    LOAD_FAVORITE_SIMILAR_MOVIES, LOAD_FAVORITE_SIMILAR_MOVIES_SUCCESS, LOAD_FAVORITE_SIMILAR_MOVIES_FAILURE,
    LOAD_FAVORITE_ACTORS, LOAD_FAVORITE_ACTORS_SUCCESS, LOAD_FAVORITE_ACTORS_FAILURE
} from '../constants/constants'

const initialState = {
    similarFavorite: [],
    isFetching: true,
    error: ''
}

export const FavoriteData = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_FAVORITE_SIMILAR_MOVIES:
            return {...state, isFetching: true, similarFavorite: []};
        case LOAD_FAVORITE_SIMILAR_MOVIES_SUCCESS:
            return {...state, isFetching: false, similarFavorite: action.simFavMovies};
        case LOAD_FAVORITE_SIMILAR_MOVIES_FAILURE:
            return {...state, isFetching: false, error: action.error};
        default:
            return state;
    }
};

export const FavoriteActors = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_FAVORITE_ACTORS:
            return {...state, isFetching: true, similarFavorite: []};
        case LOAD_FAVORITE_ACTORS_SUCCESS:
            return {...state, isFetching: false, similarFavorite: action.simFavActors};
        case LOAD_FAVORITE_ACTORS_FAILURE:
            return {...state, isFetching: false, error: action.error};
        default:
            return state;
    }
};