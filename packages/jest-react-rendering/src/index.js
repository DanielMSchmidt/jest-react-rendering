if (!global.expect) {
  console.error(
    "Coud not use jest-react-rendering, as expect is not part of the global namespace"
  );
} else {
  global.expect.extend({
    toBeUpdatedTimes(Component, expectedTimes) {
      const actualTimes = global.__react_rerenders.get(Component);
      const pass = actualTimes === expectedTimes;

      return {
        message: () => `expected ${expectedTimes} renders, got ${actualTimes}`,
        pass
      };
    },

    toResetRenderCount() {
      global.__react_rerenders.clear();

      return {
        pass: true
      };
    }
  });
}
