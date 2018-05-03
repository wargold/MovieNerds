import {
    FETCHING_MOVIES_BY_GENRE,
    FETCHING_MOVIES_BY_GENRE_SUCCESS,
    FETCHING_MOVIES_BY_GENRE_FAILURE
} from '../constants/constants'

const initialState = {
    id: '',
    movies: [],
    isFetching: false,
    error: null
}

const MoviesByGenre = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_MOVIES_BY_GENRE:
            return Object.assign({}, state, {
                isFetching: true,
                id: action.id,
                movies: []
            });
        case FETCHING_MOVIES_BY_GENRE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                id: action.id,
                movies: action.data
            });
        case FETCHING_MOVIES_BY_GENRE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.data,
            });
        default:
            return state;
    }
};

export default MoviesByGenre;
