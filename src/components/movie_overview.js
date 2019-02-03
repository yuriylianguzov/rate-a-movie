import React, { Component } from "react";
import MovieOverviewItem from "./movie_overview_item";

const Order = {
  NONE: "NONE",
  ASC: "ASC",
  DESC: "DESC"
};

class MovieOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
      ordering: Order.NONE,
      sort_icon: "",
      sort_field: "",
      filter_by_favourites: false
    };
  }

  componentDidMount() {
    // sort by title ascending order
    this.toggleSortChange('title');
  }

  handleFilterQueryChange(value) {
    this.setState({ searchQuery: value });
  }

  // sort table by field
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
        item.title.toUpperCase().includes(this.state.searchQuery.toUpperCase()) ||
        item.year.toString().includes(this.state.searchQuery) ||
        item.imdbRating.toString().includes(this.state.searchQuery)
      );
    }
  }

  // filter by favourites
  filterByKey(key, value) {
    this.setState({ filter_by_favourites: true });
    this.props.onFilterChange(key, value);
  }

  resetFilter() {
    this.setState({ filter_by_favourites: false });
    this.props.onFilterReset();
  }

  // sort an array using filter on state change
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
    const filterByFavourites = this.state.filter_by_favourites;
    let label;

    if (filterByFavourites) {
      label = (
        <span
          className="title-filter badge badge-dark"
          onClick={() => this.resetFilter("inFavourites")}
        >
          Favourites
        </span>
      );
    } else {
      label = (
        <span
          className="title-filter"
          onClick={() => this.filterByKey("inFavourites", true)}
        >
          Favourites
        </span>
      );
    }

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
            <span className={this.state.sort_field === "title" ? "" : "hidden"}>
              <i className={this.state.sort_icon} />
            </span>
          </div>
          <div
            className="col-md-2 text-md-left sortable"
            onClick={() => this.toggleSortChange("year")}
          >
            Year
            <span className={this.state.sort_field === "year" ? "" : "hidden"}>
              <i className={this.state.sort_icon} />
            </span>
          </div>
          <div
            className="col-md-2 sortable"
            onClick={() => this.toggleSortChange("imdbRating")}
          >
            IMDb Rating
            <span
              className={this.state.sort_field === "imdbRating" ? "" : "hidden"}
            >
              <i className={this.state.sort_icon} />
            </span>
          </div>
          <div className="col-md-2 sortable">{label}</div>
        </div>
        {this.props.movies
          .sort((a, b) => this.sortItems(a, b))
          .filter(item => this.filterItems(item))
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
