![](http://i.imgur.com/DUiL9yn.png)

# Movie Nerds

#### Project Description

#### What we have done and what we still plan to do

We have implemented the majority of the functions of the app, everything works accordingly to what we planned.
The things that we have left to implement are:

 * Fix some small bugs.
 * Improve the design of the app.
 * Implement the favorite page and make sure that the users can save favorite movies.
 * Implement the visualization of the users favorite movies by connecting them to each others similar movies.
 * Implement error when internet connections is lost.
 * Implement error when API Call fails.
                 

#### File Structure

`public/index.html` - This is the static HTML file. It only contains the a div with id=root that's shared among all the 
containers. It also contains script and links to different themes. 

`public/style.css` - Global styles.

`src/actions:` Actions are just things that happens ex. api calls, users triggered actions. Actions have type that describes
what actions occurred so that corresponding reducer can update that specific state. We have created actions for every unique 
api calls, user triggered actions, events that require the state to be updated etc.

`src/components:` State less components that handles rendering of the website, not aware of application state. Info about the 
data that will be rendered are send to a component through a container via props. For ex. the sliders on the first page
is rendered via component the same with the movie images, the information about a movie etc.

`src/constants:`

  * `base.js:` Contains the API key, domain, URL etc. for connecting to the firebase AUTH
  *  `constants.js:` Contains descriptions of actions, url, api keys, image size etc. All necessary constant 
  info that the majority of the files in actions, components, containers and reduces use.

`src/containers:` Containers fetch state data and use it to render (display) components, state data will become components props.
We have a container for the sliders on the first page, the search bar, log in etc.

`src/reducers:` Reducers take in actions and update part of application state. Every action have a corresponding reducer, ex. 
when fetching a movie by a genre we save the data in a array if that api call succeed otherwise another actions is called (failed api call)
then we save the error message. 

`src/index.js:` Root component that creates a store that holds the complete state tree of our website by applying the methods createStore and
 applyMiddleware. It's also in this file that we also define all of the routes.

`webpack.config.js:` Our build tool.

`.babelrc:` Babel is a JavaScript transpiler that converts JavaScript into plain old ES5 JavaScript so that we can run our website
in any browser both modern and old ones.

## Getting Started

To get started, first install all the necessary dependencies.
```
> npm install
```

Run an initial webpack build
```
> webpack
```

Start the development server (changes will now update live in browser)
```
> npm run start
```

New Dependencies for authentication:
```
> npm install @blueprintjs/core
```
> npm install npm install --save re-base
```
Firebase authentication:
https://www.youtube.com/watch?v=XMuoDQy61ys

To view your project, go to: [http://localhost:3000/](http://localhost:3000/)
