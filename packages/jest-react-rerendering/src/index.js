if (!global.expect) {
  console.error(
    "Coud not use jest-react-rendering, as expect is not part of the global namespace"
  );
} else {
  global.expect.extend({
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
}
