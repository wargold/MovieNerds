import {
    FETCHING_MOST_POPULAR_MOVIES,
    FETCHING_MOST_POPULAR_MOVIES_SUCCESS,
    FETCHING_MOST_POPULAR_MOVIES_FAILURE
} from '../constants/constants'

const initialState = {
    movies: [],
    isFetching: false,
    error: null
}

const MostPopularMovies = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_MOST_POPULAR_MOVIES:
            return {...state, isFetching: true, movies: []};
        case FETCHING_MOST_POPULAR_MOVIES_SUCCESS:
            return {...state, isFetching: false, movies: action.data};

        case FETCHING_MOST_POPULAR_MOVIES_FAILURE:
            return {...state, isFetching: false, error: action.error};
        default:
            return state;
    }
};

export default MostPopularMovies;