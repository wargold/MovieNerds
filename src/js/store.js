import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import allReducers from './reducers';
import {browserHistory, hashHistory} from 'react-router'
import {routerMiddleware} from 'react-router-redux'
import * as Actions from "./actions";

const routeMiddleware = routerMiddleware(hashHistory);
const logger = createLogger();
let middleware = [thunk, promise, routeMiddleware];
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, logger];
}

const store = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middleware)
);

store.dispatch(Actions.checkLoggin());

export default store;
