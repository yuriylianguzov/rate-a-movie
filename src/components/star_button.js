import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleFavourites } from "../actions";

class StarButton extends Component {
  render() {
    if (this.props.movie) {
      return (
        <div>
          <i
            className={
              this.props.movie.inFavourites ? "fas fa-star" : "far fa-star"
            }
            onClick={e => {
              e.stopPropagation();
              this.props.toggleFavourites(this.props.movie);
            }}
          />
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = state => {
  return { movie: state.movie };
};

export default connect(
  mapStateToProps,
  { toggleFavourites }
)(StarButton);
