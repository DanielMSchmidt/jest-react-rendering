# Jest Environment React Rendering [![Build Status](https://travis-ci.com/DanielMSchmidt/jest-environment-react-rendering.svg?branch=master)](https://travis-ci.com/DanielMSchmidt/jest-environment-react-rendering)

This is a jest environment extending [`jest-environment-jsdom`](https://github.com/facebook/jest/tree/master/packages/jest-environment-jsdom) with helpers inspired by [maicki/why-did-you-update](https://github.com/maicki/why-did-you-update).

The goal is to make rendering improvements testable.

## Setup

`npm install --save-dev jest-environment-react-rendering`

As this environment mutates React you don't want to use it everywhere, we suggest you enable it per test case via a comment.
We bring a mutated copy of React which you need to use, therefore please don't do `import React from "react"` in your tests.

```js
/**
 * @jest-environment react-rendering
 */
const React = global.React;
```

## Usage

```js
/**
 * @jest-environment react-rendering
 */
const React = global.React;
import TestRenderer from "react-test-renderer";

class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0
    };

    this.increment = this.increment.bind(this);
  }

  increment() {
    this.setState(state => ({
      count: state.count + 1
    }));
  }

  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.increment}>Inc</button>
      </div>
    );
  }
}

describe("Counter", () => {
  it("does not update on initial render", () => {
    TestRenderer.create(<Counter />);

    expect(MyComponent).toBeUpdatedTimes(0);
  });

  it("updates when the button is clicked", () => {
    const renderer = TestRenderer.create(<Counter />);
    const instance = renderer.root;
    const button = instance.find(el => el.type == "button");
    button.props.onClick();

    expect(Counter).toBeUpdatedTimes(1);
  });
});
```
