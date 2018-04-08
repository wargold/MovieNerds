import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import allReducers from './reducers';
import {Router, Route, browserHistory, hashHistory} from 'react-router'
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import routes from './router';
import App from './App';
import Movie from './containers/movie'
import Cast from './containers/cast'
import Login from './containers/login'
import { BrowserRouter } from 'react-router-dom'
import { app, base } from './base';

const history = createHistory()
const routeMiddleware = routerMiddleware(hashHistory);
const logger = createLogger();
const store = createStore(
    allReducers,
    applyMiddleware(thunk, promise, logger, routeMiddleware)
);

const NotFound = () => <h1>404.. Whoops, page not found!</h1>;

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Route exact path="/" component={App}/>
                <Route path="/login" component={Login}/>
                <Route path="/movie/:id" component={Movie}/>
                <Route path="/cast/:id" component={Cast}/>
                <Route path="/not" component={NotFound} />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);
