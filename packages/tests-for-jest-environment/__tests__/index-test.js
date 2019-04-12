/**
 * @jest-environment react-rendering
 */
const React = global.React;
import TestRenderer from "react-test-renderer";
import setup from "jest-react-rerendering";
setup();

function MyComponent() {
  return <h1>Hello World</h1>;
}

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

  it("notices component updates", () => {
    const renderer = TestRenderer.create(<Counter />);
    const instance = renderer.root;
    const button = instance.find(el => el.type == "button");
    button.props.onClick();

    expect(Counter).toBeUpdatedTimes(1);
  });
});
