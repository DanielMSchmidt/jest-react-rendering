# Jest Environment React Rendering [![Build Status](https://travis-ci.com/DanielMSchmidt/jest-environment-react-rendering.svg?branch=master)](https://travis-ci.com/DanielMSchmidt/jest-environment-react-rendering)

This is a jest environment extending [`jest-environment-jsdom`](https://github.com/facebook/jest/tree/master/packages/jest-environment-jsdom) with helpers inspired by [maicki/why-did-you-update](https://github.com/maicki/why-did-you-update).

The goal is to make rendering improvements testable.

## Setup

`npm install --save-dev jest-environment-react-rendering`

As this environment mutates React you don't want to use it everywhere, we suggest you enable it per test case via a comment.

```js
/**
 * @jest-environment react-rendering
 */
```

## Usage

```js
/**
 * @jest-environment react-rendering
 */
import TestRenderer from "react-test-renderer";

import MyComponent from "../";

describe("MyComponent", () => {
  it("renders the expected output", () => {
    expect(TestRenderer.create(<MyComponent />).toJSON()).toMatchSnapshot();
  });

  it("rerenders when a prop changes", () => {
    TestRenderer.create(<MyComponent myProp="42" />);
    expect(MyComponent).toHaveRenderedTimes(1);
    TestRenderer.create(<MyComponent myProp="23" />);
    expect(MyComponent).toHaveRenderedTimes(2);
  });

  it("does not rerender if props stay the same", () => {
    TestRenderer.create(<MyComponent myProp="23" />);
    expect(MyComponent).toHaveRenderedTimes(1);
    TestRenderer.create(<MyComponent myProp="23" />);
    expect(MyComponent).toHaveRenderedTimes(1);
  });

  it("does not rerender if the ignored prop changes", () => {
    TestRenderer.create(<MyComponent myProp="23" ignoredProp="foo" />);
    expect(MyComponent).toHaveRenderedTimes(1);
    TestRenderer.create(<MyComponent myProp="23" ignoredProp="foosball" />);
    expect(MyComponent).toHaveRenderedTimes(1);
  });
});
```
