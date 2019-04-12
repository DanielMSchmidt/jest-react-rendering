const JSDOMEnvironment = require("jest-environment-jsdom");
const React = require("react");

const instrumentReact = require("./instrumentation");

class ReactRendering extends JSDOMEnvironment {
  setup() {
    const callMap = {};
    const InstrumentedReact = instrumentReact(React, callMap);
    this.global.__react_rerenders = callMap;
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
