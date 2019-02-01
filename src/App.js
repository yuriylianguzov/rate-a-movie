import React, { Component } from 'react';
import './App.css';
import MovieOverview from './components/movie_overview';
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      filteredMovies: []
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/data`)
      .then(res => {
        this.setState({
          movies: res.data,
          moviesCopy: res.data });
      })
  }

  filterByKey(key, value) {
    const filtered = this.state.movies.filter(movie => movie[key] === value);
    this.setState({ movies: filtered })
  }

  resetFilter() {
    const movies = this.state.moviesCopy;
    this.setState({movies});
  }

  render() {
    return (
      <div className="App">
        <h1>Search a movie</h1>
        <MovieOverview movies={this.state.movies} onFilterChange={this.filterByKey.bind(this)} onFilterReset={this.resetFilter.bind(this)}/>
      </div>
    );
  }
}

export default App;
