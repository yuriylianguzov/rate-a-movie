import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.sass";
import axios from "axios";
import MovieOverview from "./components/movie_overview";
import MovieDetails from "./components/movie_details";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/data`).then(res => {
      this.setState({
        movies: res.data
      });
    });
  }

  // add/remove movie from favourites
  toggleFavourites(movie) {
    movie.inFavourites = !movie.inFavourites;
    axios.put(`http://localhost:3001/data/${movie.id}`, movie).then(res => {
      const updated = this.state.movies.map(movie => {
        if (movie.id === res.data.id) movie = res.data;
        return movie;
      });
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
