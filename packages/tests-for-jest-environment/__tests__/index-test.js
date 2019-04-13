/**
 * @jest-environment react-rendering
 */
const React = global.React;
import TestRenderer from "react-test-renderer";
import "jest-react-rendering";

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
        <MyComponent />
        <button onClick={this.increment}>Inc</button>
      </div>
    );
  }
}

describe("Integration tests", () => {
  beforeEach(() => {
    expect().toResetRenderCount();
  });

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

  it("notices component updates for class components", () => {
    const renderer = TestRenderer.create(<Counter />);
    const instance = renderer.root;
    const button = instance.find(el => el.type == "button");
    button.props.onClick();

    expect(Counter).toBeUpdatedTimes(1);
  });

  it("notices component updates for functional components", () => {
    const renderer = TestRenderer.create(<Counter />);
    const instance = renderer.root;
    const button = instance.find(el => el.type == "button");
    button.props.onClick();

    expect(MyComponent).toBeUpdatedTimes(1);
  });
});
