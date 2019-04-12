import React from "react";
import TestRenderer from "react-test-renderer";

function MyComponent() {
  return <h1>Hello World</h1>;
}

describe("ReactRendering", () => {
  it("behaves like JSDOM", () => {
    const renderer = TestRenderer.create(<MyComponent />);

    expect(renderer.toJSON()).toMatchInlineSnapshot(`
      <h1>
        Hello World
      </h1>
    `);
  });
});
