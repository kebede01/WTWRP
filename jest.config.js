export default {
  // Global settings
  injectGlobals: true,
  rootDir: "./",
  
  projects: [
    // 1. Frontend Project
    {
      displayName: "frontend",
      testEnvironment: "jsdom",
      testMatch: ["<rootDir>/src/**/*.test.{js,jsx}"], // Adjust to your frontend folder
      extensionsToTreatAsEsm: [".jsx"],
      transform: {
        "^.+\\.(js|jsx)$": "babel-jest",
      },
      moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/fileMock.js",
        "^(\\.{1,2}/.*)\\.js$": "$1"
      },
      setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    },
    // 2. Backend Project (The Fix for your BSON error)
    {
      displayName: "backend",
      testEnvironment: "node", // <--- CRITICAL: Use Node, not jsdom
      testMatch: ["<rootDir>/backend/**/*.test.js"], // Points to your backend folder
      transform: {}, // Node 18+ handles ESM naturally with your NODE_OPTIONS
    }
  ]
};