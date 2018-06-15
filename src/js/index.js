import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {Router, Route, Redirect, Switch} from 'react-router'
import App from './App';
import Movie from './containers/movie'
import Cast from './containers/cast'
import Logout from './containers/logout'
import FavoriteMovies from './containers/favoriteMovie'
import Vis from './containers/visualization'
import history from './history'
import MoviesByGenres from './containers/moviesByGenres'
import "../../public/style.css"
import store from './store'
import {APIError, NotFound} from './Help Functions/ErrorFunctions'

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/movie/:id" component={Movie}/>
                <Route path="/cast/:id" component={Cast}/>
                <Route path="/vis" component={Vis}/>
                <Route path="/myfavorites" component={FavoriteMovies}/>
                <Route path="/searchGenres/:value" component={MoviesByGenres}/>
                <Route path='/APIError' component={APIError}/>
                <Route path='/404' component={NotFound}/>
                <Redirect from='*' to='/404'/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);
