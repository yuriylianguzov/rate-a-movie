import { humanizeDuration } from "./helpers";

it('correctly converts duration to a readable format', () => {
  expect(humanizeDuration("PT125M")).toEqual("2 hr 5 min");
  expect(humanizeDuration("PT59M")).toEqual("0 hr 59 min");
})