# Movie Nerds

#### Authors: War Ahmed, Mehrdad Bahador, Thomas Wang & Tim Wayburn
#### Project Group 10
#### Project Description

Building a website for browsing movies, the users will be able to register an account on the website, view trailers, and set/remove favorite movies only if they have an account and are logged in. For more advanced interaction, we are planning to implement dynamic data visualization, for example an interactive graph where the user is able to see the connections between their favorite movies and find related/similar movies. We have used Redux with ReactJS and Firebase for authorization and also as our database for storing the users favorite movies. We are using the api [themoviedb](https://www.themoviedb.org/documentation/api) for retrieving information about movies, genres, actors etc.

##### Live Demo: https://movienerds-1f94f.firebaseapp.com

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

`src/js/actions:` Actions are just things that happens ex. api calls, users triggered actions. Actions have type that describes
what actions occurred so that corresponding reducer can update that specific state. We have created actions for every unique 
api calls, user triggered actions, events that require the state to be updated etc.

`src/js/components:` State less components that handles rendering of the website, not aware of application state. Info about the 
data that will be rendered are send to a component through a container via props. For ex. the sliders on the first page
is rendered via component the same with the movie images, the information about a movie etc.

`src/js/constants:`

  * `base.js:` Contains the API key, domain, URL etc. for connecting to the firebase AUTH
  *  `constants.js:` Contains descriptions of actions, url, api keys, image size etc. All necessary constant 
  info that the majority of the files in actions, components, containers and reduces use.

`src/js/containers:` Containers fetch state data and use it to render (display) components, state data will become components props.
We have a container for the sliders on the first page, the search bar, log in etc.

`src/js/reducers:` Reducers take in actions and update part of application state. Every action have a corresponding reducer, ex. 
when fetching a movie by a genre we save the data in a array if that api call succeed otherwise another actions is called (failed api call)
then we save the error message. 

`src/js/index.js:` Root component that creates a store that holds the complete state tree of our website by applying the methods createStore and
 applyMiddleware. It's also in this file that we also define all of the routes.
 
`src/js/App.js:` The first page of the website.
 
`src/js/history.js:` For pushing routes to the react router.
 
`src/.env:` firebase api keys, domain, db etc.
 
`src/img/:` containing gif and logo.

`webpack.config.js:` Our build tool.

`.gitignore:` For not uploading necessary files to github.

`server.js:` A minimal server running locally for testing the production mode code build.

`package.json:` holds various metadata relevant to the project. 

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
> npm run startdev
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
