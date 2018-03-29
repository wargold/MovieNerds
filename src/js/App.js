import React from 'react';
import SimpleSlider from './components/genreSlider';
import { getMovieGenres } from './actions/index';
import {MovieGenreList,SearchBar} from './containers'

require('../scss/style.scss');

let getSliders = () => {
    var genre = [1, 2, 3, 4];
    let sliders = genre.map(x => <SimpleSlider key={x}/>)
    return sliders
}

const App = () => (
    <div>
        <SearchBar/>
        <hr/>
        <h2>User Slider</h2>
        {getSliders()}
        <hr/>
        <MovieGenreList/>
    </div>

);

export default App;
