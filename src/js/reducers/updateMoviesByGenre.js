import { UPDATE_FAVORITE_MOVIE, UPDATE_FAVORITE_MOVIE_FAILURE} from "../constants/constants";

const initialState = {
    movies: [],
    favoriteID: [],
    genres: [],
    error: null
}


export const UpdateFavoriteMovies = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_FAVORITE_MOVIE:
            return {
                ...state,
                movies: action.favoriteMovies, favoriteID: action.favoriteIDs,
                genres: []
            };
        case UPDATE_FAVORITE_MOVIE_FAILURE:
            return {
                ...state, error: action.error
            };
        default:
            return state;
    }
};
