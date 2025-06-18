// Define environment variables accessed by `process.env`

declare global {
  namespace NodeJS {
    interface ProcessEnv extends AppEnvVars {
      NODE_ENV: "development" | "production" | "test";
    }
  }
}

export {};
