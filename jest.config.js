const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  testTimeout: 20000,
  setupFilesAfterEnv: ["./jest.setup.ts", "./test/setup.ts"],
  transform: {
    ...tsJestTransformCfg,
  },
};