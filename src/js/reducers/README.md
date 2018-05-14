# Reducers

Reducers take in actions and update part of application state.
- We combine all reducers into a single object before updated data is dispatched (sent) to store
- Your entire applications state (store) is just whatever gets returned from all your reducers


### More Detail Description Of Each File In This Reducers Folder:
  * `allmoviesbygenres.js:` The reducer that takes care of the action that fetches all of the genres id and name,
  saves the json object in an array.
  *  `auth.js:` The reducer that takes care of the authorisation action hence verifying/signing up a user, then saving
  necessary info about that specific user.
  * `cast.js:` The reducer that takes care of the actions that fetches a information about a specific actor.
  * `favoriteData.js:` The reducer that takes care of the action that fetches data about each movie in the users favorite
  list of movies, this is then used for d3 visualisation.
  * `genre.js:` The reducer that takes care of the action that fetches data about a movies in all genres.
  * `genreSelection.js:` The reducer that takes update the search input when the user is searching for movies by
  genres.
  * `index.js:` Connect the reducers to the redux store with the combineReducers helper function.
  * `mostPopularMovies.js:` The reducer that takes care of the action that fetches info about the most popular movies.
  * `movieByID.js:` The reducer that takes takes care of the actions that fetches info about a movie by that movies
  specific ID.
  genres.
  * `moviesByGenre.js:` The reducer that takes care of the action that fetches info about movies by a specific genre ID.
  * `moviesByMultiGenres.js:` The reducer that takes care of the action that fetches info about movies by multiple genres
  by their specific genre IDs.
  genres.
  * `search.js:` The reducer that takes of the action when the user is searching for a movie by a movie title.
  * `updateFavoriteMovies.js.js:` Updates a users favorite movie list.
