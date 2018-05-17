import {
    LOAD_FAVORITE_SIMILAR_MOVIES, LOAD_FAVORITE_SIMILAR_MOVIES_SUCCESS, LOAD_FAVORITE_SIMILAR_MOVIES_FAILURE
} from '../constants/constants'

const initialState = {
    similarFavorite: [],
    fetching: false,
    error: null
}

export const FavoriteData = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_FAVORITE_SIMILAR_MOVIES:
            return {...state, fetching: false, similarFavorite: []};
        case LOAD_FAVORITE_SIMILAR_MOVIES_SUCCESS:
            return {...state, similarFavorite: action.simFavMovies, fetching: true};
        case LOAD_FAVORITE_SIMILAR_MOVIES_FAILURE:
            return {...state, fetching: true, error: action.error};
        default:
            return state;
    }
};
