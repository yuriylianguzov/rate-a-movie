import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.sass";
import MovieOverview from "./components/movie_overview";
import MovieDetailsContainer from "./components/movieDetailsContainer";
import { connect } from "react-redux";
import { fetchMovies } from "./actions";

class App extends Component {
  componentDidMount() {
    this.props.fetchMovies();
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Route
              path="/"
              exact
              render={() => <MovieOverview movies={this.props.movies} />}
            />
            {this.props.movies.length && (
              <Route
                path="/details/:movie_id"
                render={({ match }) => (
                  <MovieDetailsContainer movieId={match.params.movie_id} />
                )}
              />
            )}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { movies: state.movies };
};

export default connect(
  mapStateToProps,
  { fetchMovies }
)(App);
