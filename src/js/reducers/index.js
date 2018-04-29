import {combineReducers} from 'redux';
import genre from './genre'
import Search from './search'
import MoviesByGenre from './moviesByGenre'
import {UpdateMoviesByGenre, UpdateFavoriteMovies} from './updateMoviesByGenre'
import GenreSelections from './genreSelection'
import MoviesByMultiGenre from './moviesByMultiGenres'
import MostPopularMovies from './mostPopularMovies'
import {MovieByID, TrailerByMovieID, CastByMovieID, SimilarMovies} from './movieByID'
import {CastByID, CastKnowMovies} from './cast'
import {FavoriteData, FavoriteActors} from "./favoriteData";
import {routerReducer} from 'react-router-redux'
import Auth from './auth'
import AllMoviegenres from './allmoviesbygenres'

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    auth: Auth,
    genres: genre,
    search: Search,
    movies: MoviesByGenre,
    updateMoviesByGenre: UpdateMoviesByGenre,
    selections: GenreSelections,
    moviesByMultiGenre: MoviesByMultiGenre,
    mostPopularMovies: MostPopularMovies,
    movieInfo: MovieByID,
    trailer: TrailerByMovieID,
    castList: CastByMovieID,
    similarMovies: SimilarMovies,
    castAbout: CastByID,
    castKnownMovies: CastKnowMovies,
    routing: routerReducer,
    updateFavorites: UpdateFavoriteMovies,
    allMoviegenres: AllMoviegenres,
    similarFavoriteMov: FavoriteData,
    favoriteActors: FavoriteActors
});

export default allReducers
