import {combineReducers} from 'redux';
import genre from './genre'
import Search from './search'
import { routerReducer } from 'react-router-redux'

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    genres: genre,
    search: Search,
    routing: routerReducer
});

export default allReducers
