import {UPDATE_ALLMOVIESBYGENRE} from "../constants/constants";

const initialState = {
    movies:[]
}

const UpdateMoviesByGenre = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ALLMOVIESBYGENRE:
            return Object.assign({}, state, {
                movies: state.movies.push(action.data)
            });
        default:
            return state;
    }
};

export default UpdateMoviesByGenre;