import React from "react";

const StarButton = ({ movie, onToggleFavourites }) => (
  <div>
    <i
      className={movie.inFavourites ? "fas fa-star" : "far fa-star"}
      onClick={e => {
        e.stopPropagation();
        onToggleFavourites(movie);
      }}
    />
  </div>
);

export { StarButton };
