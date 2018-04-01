import {UPDATE_ALLMOVIESBYGENRE} from "../constants/constants";

const initialState = {
    movies:[],
    genres:[]
}

const UpdateMoviesByGenre = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ALLMOVIESBYGENRE:
            return {
                ...state,
                movies: [...state.movies, action.movieGenres],
                genres: [...state.genres, action.allGenre]
            };
        default:
            return state;
    }
};

export default UpdateMoviesByGenre;