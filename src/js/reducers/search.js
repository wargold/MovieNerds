import {FETCHING_SEARCH_MOVIE, FETCHING_SEARCH_MOVIE_SUCCESS, FETCHING_SEARCH_MOVIE_FAILURE,
    UPDATE_INPUT_VALUE,CLEAR_SUGGESTIONS} from '../constants/constants'

const initialState = {
    value: '',
    suggestions:[],
    error: null,
    isLoading: false
}

const Search = (state = initialState, action={}) => {
    switch (action.type) {
        case FETCHING_SEARCH_MOVIE:
            return{...state,isLoading: true, value: action.text, suggestions: []};
        case FETCHING_SEARCH_MOVIE_SUCCESS:
            return{...state, isLoading:false, value: action.text, suggestions: action.data};
        case FETCHING_SEARCH_MOVIE_FAILURE:
            return{...state, value: action.text, suggestions: action.data, error: action.error};
        case UPDATE_INPUT_VALUE:
            return{...state, value: action.text};
        case CLEAR_SUGGESTIONS:
            return{...state, suggestions:[]};
        default:
            return state;
    }
};

export default Search;