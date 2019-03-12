import React from "react";
import StarButton from "./star_button";
import { Link } from "react-router-dom";

const MovieDetails = ({ movie }) => {
  return (
    <div className="container movie-details-wrap">
      <div className="row mt-md-5 movie-details">
        <div className="col-md-5">
          <img
            className="movie-poster large"
            src={movie.posterurl}
            alt="Movie poster"
          />
          <StarButton movie={movie} />
        </div>
        <div className="col-md-7 text-left">
          <h3>
            {movie.title}, {movie.year}
          </h3>
          <p>
            <strong>Ratings: </strong>
            <span className="badge badge-pill badge-warning">
              IMDb: {movie.imdbRating || "not specified"}
            </span>
            <span className="badge badge-pill badge-warning ml-1 large">
              User: {movie.userRating}
            </span>
          </p>
          <p>
            <strong>Genres: </strong>
            {movie.genres
              .toString()
              .split(",")
              .join(", ")}
          </p>
          <p>
            <strong>Cast: </strong>
            {movie.actors
              .toString()
              .split(",")
              .join(", ")}
          </p>
          <h5>Storyline </h5>
          <p>{movie.storyline}</p>
          <h5>Details </h5>
          <p>
            <strong>Release date: </strong>
            {movie.releaseDate}
          </p>
          <p>
            <strong>Content rating: </strong>
            {movie.contentRating || "not specified"}
          </p>
          <p>
            <strong>Duration: </strong>
            {movie.duration}
          </p>
        </div>
        <Link to="/" className="fas fa-times close-icon" />
      </div>
    </div>
  );
};

export default MovieDetails;
