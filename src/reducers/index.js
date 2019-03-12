import { combineReducers } from "redux";

const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_MOVIES":
      return action.payload;
    case "UPDATE_MOVIES":
      const updated = state.map(movie => {
        if (movie.id === action.payload.id) movie = action.payload;
        return movie;
      });
      return updated;
    default:
      return state;
  }
};

const movieReducer = (state = null, action) => {
  switch (action.type) {
    case "FETCH_MOVIE":
      return action.payload;
    case "TOGGLE_FAVOURITES":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  movies: moviesReducer,
  movie: movieReducer
});
