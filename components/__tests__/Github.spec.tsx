import React from "react";
import { shallow } from "enzyme";
import GitHub from "../Github";

test("hello", () => {
  const wrapper = shallow(<GitHub />);
  expect(wrapper).toMatchSnapshot();
});
