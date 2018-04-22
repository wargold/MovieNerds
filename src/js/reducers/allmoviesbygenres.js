import {LOADED_ALL_MOVIES, LOADED_ALL_MOVIES_SUCCESS,LOADED_ALL_MOVIES_FAILURE} from '../constants/constants'

const initialState = {
    genres:[],
    moviesByGenres: [],
    isFetching: true,
    error:''
}

const AllMoviegenres = (state = initialState, action) => {
    switch (action.type) {
        case LOADED_ALL_MOVIES:
            return {...state, isFetching: true, genres: [], moviesByGenres: []};
        case LOADED_ALL_MOVIES_SUCCESS:
            return {...state, isFetching: false, genres: action.genres, moviesByGenres: [...state,action.moviesByGenres]};
        case LOADED_ALL_MOVIES_FAILURE:
            return {...state, isFetching: false, error:action.error};
        default:
            return state;
    }
};

export default AllMoviegenres;