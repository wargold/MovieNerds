# Containers

Containers fetch state data and use it to render (display) components.
- state data will become components props

Containers are similar to components. However, only containers have access to state data in Redux.
- components are sometimes called "dumb components" or "presentational components"


### More Detail Description Of Each File In This Containers Folder:
  * `/css:` Contains styling (.css) for some of the containers.
  *  `cast.css:` Invoke action for fetching info about an actor by their specific ID, then also fetching info about
  what movies an actor is famous for by invoking an action that gets those movies by an actors ID. It also pass props
  to the component castInfo.js that takes care of displaying the data.
  * `favoriteMovie.js:` Connects to the DB for getting all of the movies in a users favorite movie list and displaying
  those. 
  *  `login.js:` Handles the authorisation of login with email and facebook with a popup.
  * `logout.js:` Handles the authorisation of logout a current logged in user.
  * `main.js:` The first page of the website hence, navbar and the carousel/slider with all of the genres and the most
  popular movies.
  *  `movie.js:` Invoke action for fetching all necessary info about an movie, like info about that movie, cast members,
  similar movies. It also pass props to the component movieInfo.js that takes care of displaying the data.
  * `movieGenreList.js:` Invoke action for fetching all the genres, the movies by each genres and the most popular 
  movies. It also pass props to the component mostPopularSlide.js and genreSlider.js that takes care of displaying the 
  data.
  *  `moviesByGenres.js:` Takes care of displaying the movies that contains those genres that a user is choosing.It also 
  pass props to the component moviesListByGenre.js that takes care of displaying the data.
  * `navbar.js:` The navbar that contains the searchBar.js, selectGenre.js and login.js.
  * `searchBar.js:` Handles the action when a user is searching for a movie by a title, it debounce the users input 
  500ms, fetch movies that contains that specific title and displays to the user by a dropdown.
  * `selectGenre.js:` Handles the action when a user is searching for a movie by genres, it update the search value so
  that the moviesByGenres.js can handle the fetching and displaying of movies by those genres.
  * `visualization.js:` Builds the d3 graph that connects the same similar movies in a users favorite movie list by 
  invoking actions that gets the users favorite movies from the DB and fetches all necessary info for building the
  draggable d3 graph.
