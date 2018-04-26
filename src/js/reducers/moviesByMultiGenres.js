import {
    FETCHING_MOVIES_BY_GENRES,
    FETCHING_MOVIES_BY_GENRES_SUCCESS,
    FETCHING_MOVIES_BY_GENRES_FAILURE
} from '../constants/constants'

const initialState = {
    genres: '',
    isFetching: false,
    moviesByGenres:null,
    error: null
}

const MoviesByMultiGenre = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_MOVIES_BY_GENRES:
            return {...state, isFetching: true, genres: '', moviesByGenres:null};
        case FETCHING_MOVIES_BY_GENRES_SUCCESS:
            return {...state, isFetching: false, genres: action.genres ,moviesByGenres: action.data };
        case FETCHING_MOVIES_BY_GENRES_FAILURE:
            return  {...state, isFetching: false, error: action.error,};
        default:
            return state;
    }
};

export default MoviesByMultiGenre;