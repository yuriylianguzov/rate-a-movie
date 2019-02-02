import React from "react";
import StarButton from "./star_button";
import { humanizeDuration } from '../helpers';
import { Link } from "react-router-dom";

const MovieDetails = (props) => {
  const userRating = (props.movie.ratings.reduce((a, b) => a + b, 0) / props.movie.ratings.length).toFixed(1);
  const duration = humanizeDuration(props.movie.duration);

  return (
    <div className="container movie-details-wrap">
      <div className="row mt-md-5 movie-details">
        <div className="col-md-5">
          <img
            className="movie-poster large"
            src={props.movie.posterurl}
            alt="Movie poster"
          />
          <StarButton
            movie={props.movie}
            onToggleFavourites={props.onToggleFavourites}
          />
        </div>
        <div className="col-md-7 text-left">
          <h3>
            {props.movie.title}, {props.movie.year}
          </h3>
          <p>
            <strong>Ratings: </strong>
            <span className="badge badge-pill badge-warning">
              imdb: {props.movie.imdbRating || 'not specified'}
            </span>
            <span className="badge badge-pill badge-warning ml-1 large">
              user: {userRating}
            </span>
          </p>
          <p>
            <strong>Genres: </strong>
            {props.movie.genres
              .toString()
              .split(",")
              .join(", ")}
          </p>
          <p>
            <strong>Cast: </strong>
            {props.movie.actors
              .toString()
              .split(",")
              .join(", ")}
          </p>
          <h5>Storyline </h5>
          <p>{props.movie.storyline}</p>
          <h5>Details </h5>
          <p>
            <strong>Release date: </strong>
            {props.movie.releaseDate}
          </p>
          <p>
            <strong>Content rating: </strong>
            {props.movie.contentRating || 'not specified'}
          </p>
          <p>
            <strong>Duration: </strong>
            {duration}
          </p>
        </div>
        <Link to="/" className="fas fa-times close-icon">
        </Link>
      </div>
    </div>
  );
};

export default MovieDetails;
