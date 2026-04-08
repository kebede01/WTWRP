export default {
  injectGlobals: true,
  testEnvironment: "jsdom",
  rootDir: "./",
  extensionsToTreatAsEsm: [".jsx"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
 moduleNameMapper: {
  "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/fileMock.js",
  "^(\\.{1,2}/.*)\\.js$": "$1"
},
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // No /src/
};