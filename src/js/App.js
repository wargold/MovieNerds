import React from 'react';
import {MovieGenreList, SearchBar} from './containers'

require('../scss/style.scss');

const App = () => (
    <div className="main">
        <SearchBar/>
        <hr/>
        <MovieGenreList/>
    </div>

);

export default App;
