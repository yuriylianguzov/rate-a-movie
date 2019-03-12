import movies from "../apis/movies";
import { humanizeDuration } from "../helpers";

export const fetchMovies = () => async dispatch => {
  const response = await movies.get();
  dispatch({ type: "FETCH_MOVIES", payload: response.data });
};

export const fetchMovie = id => async dispatch => {
  const response = await movies.get(`/${id}`);
  response.data.userRatingFormatted = (
    response.data.ratings.reduce((a, b) => a + b, 0) /
    response.data.ratings.length
  ).toFixed(1);

  response.data.humanizedDuration = humanizeDuration(response.data.duration);
  dispatch({ type: "FETCH_MOVIE", payload: response.data });
};

export const toggleFavourites = movie => async dispatch => {
  movie.inFavourites = !movie.inFavourites;
  const response = await movies.put(`/${movie.id}`, movie);
  dispatch({ type: "TOGGLE_FAVOURITES", payload: response.data });
  dispatch({ type: "UPDATE_MOVIES", payload: response.data });
};
