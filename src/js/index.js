import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import allReducers from './reducers';
import {Router, Route, browserHistory, hashHistory, Redirect, Switch} from 'react-router'
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux'
import App from './App';
import Movie from './containers/movie'
import Cast from './containers/cast'
import Login from './containers/login'
import Logout from './containers/logout'
import FavoriteMovies from './containers/favoriteMovie'
import { BrowserRouter } from 'react-router-dom'
import Vis from './containers/visualization'
import history from './history'
import MoviesByGenres from './containers/moviesByGenres'
import "../../public/style.css"

const routeMiddleware = routerMiddleware(hashHistory);
const logger = createLogger();
const store = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk, promise, logger, routeMiddleware)

);

const NotFound = () => <h1>404.. Whoops, page not found!</h1>;
const APIError = () => <h1>404.. Whoops, page not found!</h1>;

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/login" component={Login}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/movie/:id" component={Movie}/>
                <Route path="/cast/:id" component={Cast}/>
                <Route path="/vis" component={Vis}/>
                <Route path="/myfavorites" component={FavoriteMovies}/>
                <Route path="/searchGenres/:value" component={MoviesByGenres}/>
                <Route path='/APIError' component={APIError} />
                <Route path='/404' component={NotFound} />
                <Redirect from='*' to='/404' />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);
