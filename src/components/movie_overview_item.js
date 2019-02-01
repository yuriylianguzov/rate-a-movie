import React from 'react';

const MovieOverviewItem = ({movie}) => {

  return (
    <div className="row">
      <div className="col-md-3">
        <img className="movie-poster" src={movie.posterurl} alt="Movie poster"/>
      </div>
      <div className="col-md-3">{movie.title}</div>
      <div className="col-md-2">{movie.year}</div>
      <div className="col-md-2">{movie.imdbRating}</div>
      <div className="col-md-2">{movie.inFavourites ? 'yes': 'no'}</div>
    </div>
  );
};

export default MovieOverviewItem;