import type { Config } from "jest";
import path from "path";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: [path.resolve(__dirname, "jest.setup.ts")],
};

export default config;
