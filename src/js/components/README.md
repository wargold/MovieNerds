## Containers vs. Components

Containers are very similar to components, the only difference is that containers are aware of application state. If
part of your webpage is only used for displaying data (dumb) then make it a component. If you need it to be smart and
aware of the state (whenever data changes) in the application then make it a container.



### More Detail Description Of Each File In This Components Folder:
  * `/css:` Contains styling (.css/.scss) for the components.
  *  `castInfo.js:` Displays information about an actor and similar movies by sending props to moviecard.js and contains
   the css file cast.css that takes care of making the layout more "beautiful" and responsive hence increasing the 
   usability.
  * `genreSlider.js:` Creating and displaying the slider for each genre available and each movie in the slider is created
   by sending props to moviecard.js. It also contains the css/scss file slider.css and dots.scss that takes care of making
   the movie page layout more "beautiful" and responsive hence increasing the usability.
  *  `mostPopularSlide.js:` Creating and displaying the Carousel most popular movies and contains the css file
  mostPopularSlide.css
  * `movieInfo.js:` Displays info about an movie, contains the css file movie.css
  * `moviecards.js:` Gets props from different components and returns a styled img that on hover you can see the 
  title, rating and date of a movie, contains the css file moviecards.css
  * `moviesListByGenre.js:` Displays the movies of a set of genres that is chooses by a user, contains the scss file 
  moviesListByGenres.scss.
