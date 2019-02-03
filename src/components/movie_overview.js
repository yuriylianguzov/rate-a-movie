import React, { Component } from "react";
import MovieOverviewItem from "./movie_overview_item";

const Order = {
  NONE: "NONE",
  ASC: "ASC",
  DESC: "DESC"
};

// filter to apply when mapping over movies to render
const filterByFavorites = (applyFilter, item, key) => {
  if (applyFilter) {
    return item[key] === true;
  }
  return true;
};

class MovieOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
      ordering: Order.ASC,
      sort_icon: "fas fa-sort-amount-up",
      sort_field: "title",
      filter_by_favourites: false
    };
  }

  // toggle filter by favourites
  toggleFavouritesFilter = () => {
    this.setState({ filter_by_favourites: !this.state.filter_by_favourites });
  };

  handleFilterQueryChange(value) {
    this.setState({ searchQuery: value });
  }

  // toggle sort order and field to sort by
  toggleSortChange(field) {
    if (this.state.ordering === Order.NONE) {
      this.setState({
        ordering: Order.ASC,
        sort_field: field,
        sort_icon: "fas fa-sort-amount-up"
      });
    } else if (this.state.ordering === Order.ASC) {
      this.setState({
        ordering: Order.DESC,
        sort_field: field,
        sort_icon: "fas fa-sort-amount-down"
      });
    } else if (this.state.ordering === Order.DESC) {
      this.setState({ ordering: Order.NONE, sort_field: "", sort_icon: "" });
    }
  }

  // filter used for live search
  filterItems(item, key) {
    if (key) {
      return item[key] === true;
    } else {
      return (
        item.title
          .toUpperCase()
          .includes(this.state.searchQuery.toUpperCase()) ||
        item.year.toString().includes(this.state.searchQuery) ||
        item.imdbRating.toString().includes(this.state.searchQuery)
      );
    }
  }

  // sort an array by order
  sortItems(a, b) {
    if (this.state.ordering === Order.ASC) {
      if (a[this.state.sort_field] < b[this.state.sort_field]) return -1;
    } else if (this.state.ordering === Order.DESC) {
      if (!(a[this.state.sort_field] < b[this.state.sort_field])) return -1;
    } else {
      return a.id - b.id;
    }
  }

  render() {
    const { filter_by_favourites } = this.state;

    return (
      <div className="container">
        <div className="row row-header">
          <div className="col-md-3 text-md-left pl-0">
            <input
              type="text"
              placeholder="Search a movie"
              value={this.state.searchQuery}
              onChange={event =>
                this.handleFilterQueryChange(event.target.value)
              }
            />
          </div>
          <div
            className="col-md-3 text-md-left sortable p-0"
            onClick={() => this.toggleSortChange("title")}
          >
            Title
            <i
              className={
                this.state.sort_field === "title"
                  ? this.state.sort_icon
                  : "fas fa-sort"
              }
            />
          </div>
          <div
            className="col-md-2 text-md-left sortable"
            onClick={() => this.toggleSortChange("year")}
          >
            Year
            <i
              className={
                this.state.sort_field === "year"
                  ? this.state.sort_icon
                  : "fas fa-sort"
              }
            />
          </div>
          <div
            className="col-md-2 sortable"
            onClick={() => this.toggleSortChange("imdbRating")}
          >
            IMDb Rating
            <i
              className={
                this.state.sort_field === "imdbRating"
                  ? this.state.sort_icon
                  : "fas fa-sort"
              }
            />
          </div>
          <div className="col-md-2 sortable">
            <span
              className={
                filter_by_favourites
                  ? "title-filter badge badge-dark"
                  : "title-filter badge badge-light"
              }
              onClick={this.toggleFavouritesFilter}
            >
              Favourites
            </span>
          </div>
        </div>
        {this.props.movies
          .sort((a, b) => this.sortItems(a, b))
          .filter(item => this.filterItems(item))
          .filter(item =>
            filterByFavorites(filter_by_favourites, item, "inFavourites")
          )
          .map(movie => (
            <MovieOverviewItem
              key={movie.id}
              movie={movie}
              onToggleFavourites={this.props.onToggleFavourites}
            />
          ))}
      </div>
    );
  }
}

export default MovieOverview;
