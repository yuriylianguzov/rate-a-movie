import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import StarButton from "./star_button";
import history from "../history";

class MovieOverviewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  redirectToDetailsView = () => {
    this.setState({ redirect: true });
  };

  render() {
    const { redirect } = this.state;

    if (redirect) {
      history.push(`/details/${this.props.movie.id}`);
      return <Redirect to={`/details/${this.props.movie.id}`} />;
    }
    return (
      <div
        className="row align-items-center justify-content-start mb-3 movie-container"
        onClick={this.redirectToDetailsView}
      >
        <div className="col-md-3 text-md-left p-2">
          <img
            className="movie-poster"
            src={this.props.movie.posterurl}
            alt="Movie poster"
          />
        </div>
        <div className="col-md-3 text-md-left p-0">
          {this.props.movie.title}
        </div>
        <div className="col-md-2 text-md-left">{this.props.movie.year}</div>
        <div className="col-md-2">{this.props.movie.imdbRating}</div>

        <div className="col-md-2">
          <StarButton
            movie={this.props.movie}
            onToggleFavourites={this.props.onToggleFavourites}
          />
        </div>
      </div>
    );
  }
}

export default MovieOverviewItem;
