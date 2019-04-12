const JSDOMEnvironment = require("jest-environment-jsdom");

class ReactRendering extends JSDOMEnvironment {}

module.exports = ReactRendering;
