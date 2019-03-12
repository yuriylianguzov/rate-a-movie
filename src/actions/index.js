import movies from "../apis/movies";
import { humanizeDuration } from "../helpers";

export const fetchMovies = () => async dispatch => {
  const response = await movies.get();
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

// add/remove movie from favourites
// toggleFavourites(movie) {
//   movie.inFavourites = !movie.inFavourites;
//   axios.put(`http://localhost:3001/data/${movie.id}`, movie).then(res => {
//     const updated = this.props.movies.map(movie => {
//       if (movie.id === res.data.id) movie = res.data;
//       return movie;
//     });
//     this.setState({ movies: updated });
//   });
// }

export const toggleFavourites = movie => async dispatch => {
  movie.inFavourites = !movie.inFavourites;
  const response = await movies.put(`/${movie.id}`, movie);
  dispatch({ type: "TOGGLE_FAVOURITES", payload: response.data });
};
