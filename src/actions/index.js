import movies from "../apis/movies";
import { humanizeDuration } from "../helpers";

export const fetchMovies = () => async dispatch => {
  const response = await movies.get();
  console.log("fetch movies response: ", response);
  dispatch({ type: "FETCH_MOVIES", payload: response.data });
};

export const fetchMovie = id => async dispatch => {
  const response = await movies.get(`/${id}`);

  response.userRating = (
    response.data.ratings.reduce((a, b) => a + b, 0) /
    response.data.ratings.length
  ).toFixed(1);
  response.data.duration = humanizeDuration(response.data.duration);
  dispatch({ type: "FETCH_MOVIE", payload: response.data });
};

// export const toggleFavourites = movie => async dispatch => {
//   movie.inFavourites = !movie.inFavourites;

//   // .then(res => {
//   //   const updated = this.props.movies.map(movie => {
//   //     if (movie.id === res.data.id) movie = res.data;
//   //     return movie;
//   //   });
//   dispatch({ type: "TOGGLE_FAVOURITES", payload: response.data });
// };

export const selectMovie = movie => {
  return {
    type: "MOVIE_SELECTED",
    payload: movie
  };
};
