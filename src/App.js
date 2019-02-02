import React, { Component } from "react";
import "./App.css";
import MovieOverview from "./components/movie_overview";
import MovieDetails from "./components/movie_details";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      filteredMovies: []
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/data`).then(res => {
      this.setState({
        movies: res.data,
        moviesCopy: res.data
      });
    });
  }

  filterByKey(key, value) {
    const filtered = this.state.movies.filter(movie => movie[key] === value);
    this.setState({ movies: filtered });
  }

  resetFilter() {
    const movies = this.state.moviesCopy;
    this.setState({ movies });
  }

  toggleFavourites(movie) {
    movie.inFavourites = !movie.inFavourites;
    axios.put(`http://localhost:3001/data/${movie.id}`, (movie)).then(res => {
      const updated = this.state.movies.map(movie => {
        if (movie.id === res.data.id) movie = res.data;
        return movie;
      })
      this.setState({ movies: updated });
    });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Route
              path="/"
              exact
              render={() => (
                <MovieOverview
                  movies={this.state.movies}
                  onFilterChange={this.filterByKey.bind(this)}
                  onFilterReset={this.resetFilter.bind(this)}
                  onToggleFavourites={this.toggleFavourites.bind(this)}
                />
              )}
            />
            {this.state.movies.length && (
              <Route
                path="/details/:movie_id"
                render={({ match }) => (
                  <MovieDetails
                    movie={this.state.movies.find(
                      m => m.id === match.params.movie_id
                    )}
                    onToggleFavourites={this.toggleFavourites.bind(this)}
                  />
                )}
              />
            )}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
