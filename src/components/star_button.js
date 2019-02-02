import React, { Component } from "react";

class StarButton extends Component {

  toggleFavourites = (e) => {
    e.stopPropagation();
    this.props.onToggleFavourites(this.props.movie);
  }

  render() {
    let starButton;
    const inFavourites = this.props.movie.inFavourites;

    if (inFavourites) {
      starButton = (
        <i className="fas fa-star"
          onClick={this.toggleFavourites} />
      );
    } else {
      starButton = (
        <i className="far fa-star"
          onClick={this.toggleFavourites} />
      );
    }
    return <div>{starButton}</div>;
  }
}

export default StarButton;
