if (!global.expect) {
  console.error(
    "Coud not setup jest-react-rerendering, no global expect known and no specific one passed"
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
