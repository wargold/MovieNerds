import {UPDATE_ALLMOVIESBYGENRE, UPDATE_FAVORITE_MOVIE} from "../constants/constants";

const initialState = {
    movies:[],
    genres:[]
}

export const UpdateMoviesByGenre = (state = initialState, action) => {
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

export const UpdateFavoriteMovies = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_FAVORITE_MOVIE:
            return {
                ...state,
                movies: [action.favoriteMovies],
                genres: []
            };
        default:
            return state;
    }
};