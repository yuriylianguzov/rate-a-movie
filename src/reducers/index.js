import { combineReducers } from "redux";

const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_MOVIES":
      return action.payload;
    case "UPDATE_MOVIES":
      return action.payload;
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
