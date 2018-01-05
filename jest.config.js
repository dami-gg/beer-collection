module.exports = {
  collectCoverageFrom: ["src/**/*.{js,jsx}"],
  setupFiles: ["<rootDir>/config/polyfills.js", "raf/polyfill"],
  setupTestFrameworkScriptFile: "<rootDir>/config/test-scripts.js",
  testPathIgnorePatterns: ["<rootDir>/(build|docs|node_modules)/"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.js?(x)",
    "<rootDir>/src/**/?(*.)(spec|test).js?(x)"
  ],
  testEnvironment: "node",
  testURL: "http://localhost",
  transform: {
    "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
  moduleNameMapper: {
    "^react-native$": "react-native-web"
  }
};
