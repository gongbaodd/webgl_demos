import React from "react";
import { mount } from "enzyme";

test("hello", () => {
  const wrapper = mount(<p>Hello Jest!</p>);
  expect(wrapper.text()).toMatch("Hello Jest!");
});
