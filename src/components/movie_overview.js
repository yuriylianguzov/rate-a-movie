import React, { Component } from 'react';
import MovieOverviewItem from './movie_overview_item';


const Order = {
  NONE: 'NONE',
  ASC: 'ASC',
  DESC: 'DESC'
}

class MovieOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      ordering: Order.NONE,
      sort_field: ''
    }
  }

  handleFilterQueryChange(value) {
    this.setState({ searchQuery: value })
  }

  toggleSortChange(field) {
    if (this.state.ordering === Order.NONE) {
      this.setState({ ordering: Order.ASC, sort_field: field })
    } else if (this.state.ordering === Order.ASC) {
      this.setState({ ordering: Order.DESC, sort_field: field });
    } else if (this.state.ordering === Order.DESC) {
      this.setState({ ordering: Order.NONE, sort_field: '' });
    }
  }

  filterItems(item, key) {
    if (key) {
      return item[key] === true;  
    } else {
      return (
        item.title.toUpperCase().includes(this.state.searchQuery.toUpperCase()) ||
        item.year.toString().includes(this.state.searchQuery) ||
        item.imdbRating.toString().includes(this.state.searchQuery)
      );
    }
  }

  filterByKey(key, value) {
    this.props.onFilterChange(key, value);
  }

  sortItems(a, b) {
    if (this.state.ordering === Order.ASC) {
      if(a[this.state.sort_field] < b[this.state.sort_field]) return -1;
    } else if (this.state.ordering === Order.DESC) {
      if (!(a[this.state.sort_field] < b[this.state.sort_field])) return -1;
    } else {
      return a.id - b.id;
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row row-header">
          <div className="col-md-3">
            <input type="text" 
              value={this.state.searchQuery}
              onChange={event => this.handleFilterQueryChange(event.target.value)} />
          </div>
          <div className="col-md-3" onClick={() => this.toggleSortChange('title')}>Title</div>
          <div className="col-md-2" onClick={() => this.toggleSortChange('year')}>Year</div>
          <div className="col-md-2" onClick={() => this.toggleSortChange('imdbRating')}>IMDB Rating</div>
          <div className="col-md-2" onClick={() => this.toggleSortChange('inFavourites')}>
            Favourites
          </div>
          <div><button onClick={() => this.filterByKey('inFavourites', true)}>filter by </button>
          <button onClick={() => this.props.onFilterReset()}>Reset Filter </button></div>
        </div>
        {this.props.movies.sort((a, b) => this.sortItems(a, b)).filter(item => this.filterItems(item)).map((movie, index) => (
          <MovieOverviewItem key={movie.id} movie={movie}/>
        ))}
      </div>
    )
  }

}

export default MovieOverview;