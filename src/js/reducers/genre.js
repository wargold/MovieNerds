import {FETCHING_GENRE, FETCHING_GENRE_SUCCESS, FETCHING_GENRE_FAILURE} from '../constants/constants'

const initialState = {
    genres: [],
    isFetching: false,
    error: null
}

const genre = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_GENRE:
            return Object.assign({}, state, {
                isFetching: true,
                genres: []
            });
        case FETCHING_GENRE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                genres: action.data
            });
        case FETCHING_GENRE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.data,
            });
        default:
            return state;
    }
};

export default genre;