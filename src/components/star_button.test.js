import React from "react";
import { shallow } from "enzyme";
import { StarButton } from "./star_button";

let MOVIE_TEST_DATA = {
  inFavourites: true
};

describe("Test StarButton component", () => {

  it("When in favourites it should have 'fas' class", () => {
    const shallowComponent = shallow(
      <StarButton movie={MOVIE_TEST_DATA} />
    );

    expect(shallowComponent.find("i").is(".fas")).toBe(true);
  });

  it("When not in favourites it should have 'far' class", () => {
    MOVIE_TEST_DATA.inFavourites = false;
    const shallowComponent = shallow(<StarButton movie={MOVIE_TEST_DATA} />);

    expect(shallowComponent.find("i").is(".far")).toBe(true);
  });
});
