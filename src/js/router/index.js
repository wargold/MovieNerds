import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from '../App';

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={App}/>
        <Route path="hem" component={App}/>
    </Route>
);

export default routes;