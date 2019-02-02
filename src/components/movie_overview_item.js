import React from "react";
import { Link } from "react-router-dom";

const MovieOverviewItem = props => {
  return (
    <div className="row">
      <div className="col-md-3">
        <img
          className="movie-poster"
          src={props.movie.posterurl}
          alt="Movie poster"
        />
      </div>
      <div className="col-md-3">
        <Link to={`/details/${props.movie.id}`}>{props.movie.title}</Link>
      </div>
      <div className="col-md-2">{props.movie.year}</div>
      <div className="col-md-2">{props.movie.imdbRating}</div>
      <div
        className="col-md-2"
        onClick={() => props.onToggleFavourites(props.movie)}>
        {props.movie.inFavourites ? "yes" : "no"}
      </div>
    </div>
  );
};

export default MovieOverviewItem;
