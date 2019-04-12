/**
 * @jest-environment react-rendering
 */
const React = global.React;
import TestRenderer from "react-test-renderer";

// TODO: move this to a better place, maybe a setup script
expect.extend({
  toBeUpdatedTimes(Component, expectedTimes) {
    const renderingMap = global.__react_rerenders || {};
    const actualTimes = renderingMap[Component] || 0;
    const pass = actualTimes === expectedTimes;

    return {
      message: () => `expected ${expectedTimes} renders, got ${actualTimes}`,
      pass
    };
  }
});

function MyComponent() {
  return <h1>Hello World</h1>;
}

describe("Integration tests", () => {
  it("behaves like JSDOM", () => {
    const renderer = TestRenderer.create(<MyComponent />);

    expect(renderer.toJSON()).toMatchInlineSnapshot(`
      <h1>
        Hello World
      </h1>
    `);
  });

  it("does not update on initial render", () => {
    TestRenderer.create(<MyComponent />);

    expect(MyComponent).toBeUpdatedTimes(0);
  });
});
