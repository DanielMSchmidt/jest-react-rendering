const JSDOMEnvironment = require("jest-environment-jsdom");
const React = require("react");

const instrumentReact = require("./instrumentation");

class CallRegistry {
  constructor() {
    this.map = new Map();
  }

  registerUpdate(Component) {
    this.map.set(Component, this.get(Component) + 1);
  }

  get(Component) {
    return this.map.get(Component) || 0;
  }

  clear() {
    this.map.clear();
  }
}

class ReactRendering extends JSDOMEnvironment {
  setup() {
    this.global.__react_rerenders = new CallRegistry();
    const InstrumentedReact = instrumentReact(
      React,
      this.global.__react_rerenders
    );
    this.global.React = InstrumentedReact;

    return Promise.resolve();
  }

  teardown() {
    if (React.__JEST_REACT_RENDERING_RESET__) {
      React.__JEST_REACT_RENDERING_RESET__();
    }

    delete this.global.__react_rerenders;
  }
}

module.exports = ReactRendering;
