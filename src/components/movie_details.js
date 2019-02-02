import React from "react";
import { Link } from "react-router-dom";

const MovieDetails = ({ movie }) => {
  return (
    <div className="row">
      <div className="col-md-4">
        <img
          className="movie-poster"
          src={movie.posterurl}
          alt="Movie poster"/>
      </div>
      <div className="col-md-8">{movie.title}</div>
      <Link to="/">go back to list</Link>
    </div>
  );
};

export default MovieDetails;
