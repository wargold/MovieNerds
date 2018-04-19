import {
    FETCHING_CASTBYID, FETCHING_CASTBYID_SUCCESS, FETCHING_CASTBYID_FAILURE,
    FETCHING_CAST_KNOWN_MOVIES, FETCHING_CAST_KNOWN_MOVIES_SUCCESS, FETCHING_CAST_KNOWN_MOVIES_FAILURE
} from '../constants/constants'

const initialState = {
    id: '',
    info: [],
    isFetching: false,
    error: null
}

export const CastByID = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_CASTBYID:
            return {...state, isFetching: true, id: action.id, info: []};
        case FETCHING_CASTBYID_SUCCESS:
            return {...state, isFetching: false, id: action.id, info: action.data};
        case FETCHING_CASTBYID_FAILURE:
            return {...state, isFetching: false, error: action.error};
        default:
            return state;
    }
};

export const CastKnowMovies = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_CAST_KNOWN_MOVIES:
            return {...state, isFetching: true, id: action.id, info: []};
        case FETCHING_CAST_KNOWN_MOVIES_SUCCESS:
            return {...state, isFetching: false, id: action.id, info: action.data};
        case FETCHING_CAST_KNOWN_MOVIES_FAILURE:
            return {...state, isFetching: false, error: action.error};
        default:
            return state;
    }
};


