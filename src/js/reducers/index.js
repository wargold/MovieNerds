import {combineReducers} from 'redux';
import genre from './genre'
import Search from './search'
import MoviesByGenre from './moviesByGenre'
import UpdateMoviesByGenre from './updateMoviesByGenre'
import GenreSelections from './genreSelection'
import MoviesByMultiGenre from './moviesByMultiGenres'
import {routerReducer} from 'react-router-redux'

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    genres: genre,
    search: Search,
    movies: MoviesByGenre,
    updateMoviesByGenre:UpdateMoviesByGenre,
    selections: GenreSelections,
    moviesByMultiGenre: MoviesByMultiGenre,
    routing: routerReducer
});

export default allReducers
