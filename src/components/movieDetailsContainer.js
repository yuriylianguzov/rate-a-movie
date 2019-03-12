import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMovie } from "../actions";
import MovieDetails from "./movie_details";

class MovieDetailsContainer extends Component {
  componentDidMount() {
    this.props.fetchMovie(this.props.movieId);
  }

  render() {
    if (this.props.movie) {
      return <MovieDetails movie={this.props.movie} />;
    }
    return null;
  }
}

const mapStateToProps = state => {
  return { movie: state.movie };
};

export default connect(
  mapStateToProps,
  { fetchMovie }
)(MovieDetailsContainer);
