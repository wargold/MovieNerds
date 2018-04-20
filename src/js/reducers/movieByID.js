import {FETCHING_MOVIEBYID, FETCHING_MOVIEBYID_SUCCESS, FETCHING_MOVIEBYID_FAILURE, FETCHING_MOVIETRAILER,
    FETCHING_MOVIETRAILER_SUCCESS, FETCHING_MOVIETRAILER_FAILURE, FETCHING_CAST, FETCHING_CAST_SUCCESS,
    FETCHING_CAST_FAILURE, FETCHING_SIMILAR_MOVIES, FETCHING_SIMILAR_MOVIES_SUCCESS, FETCHING_SIMILAR_MOVIES_FAILURE,
    UPDATE_CASTLIST, UPDATE_MOVIELIST
} from '../constants/constants'

const initialState = {
    movieID: '',
    movieInfo: [],
    isFetching: false,
    error: null
}

export const MovieByID = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_MOVIEBYID:
            return {...state, isFetching: true, movieID: action.id, movieInfo: []};
        case FETCHING_MOVIEBYID_SUCCESS:
            return {...state, isFetching: false, movieID: action.id, movieInfo: action.data};
        case FETCHING_MOVIEBYID_FAILURE:
            return {...state, isFetching: false, error: action.error};
        case UPDATE_MOVIELIST:
            return {...state, movieInfo:[]};
        default:
            return state;
    }
};

export const TrailerByMovieID = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_MOVIETRAILER:
            return {...state, isFetching: true, movieID: action.id, movieInfo: []};
        case FETCHING_MOVIETRAILER_SUCCESS:
            return {...state, isFetching: false, movieID: action.id, movieInfo: action.data};
        case FETCHING_MOVIETRAILER_FAILURE:
            return {...state, isFetching: false, error: action.error};
        default:
            return state;
    }
};

export const CastByMovieID = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_CAST:
            return {...state, isFetching: true, movieID: action.id, movieInfo: []};
        case FETCHING_CAST_SUCCESS:
            return {...state, isFetching: false, movieID: action.id, movieInfo: action.data};
        case FETCHING_CAST_FAILURE:
            return {...state, isFetching: false, error: action.error};
        case UPDATE_CASTLIST:
            return {...state, movieID:[]};
        default:
            return state;
    }
};

export const SimilarMovies = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_SIMILAR_MOVIES:
            return {...state, isFetching: true, movieID: action.id, movieInfo: []};
        case FETCHING_SIMILAR_MOVIES_SUCCESS:
            return {...state, isFetching: false, movieID: action.id, movieInfo: action.data};
        case FETCHING_SIMILAR_MOVIES_FAILURE:
            return {...state, isFetching: false, error: action.error};
        default:
            return state;
    }
};

