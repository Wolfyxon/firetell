import type { NextConfig } from "next";

if(process.env.ENV_FILE) {
  console.log("Using env file", process.env.ENV_FILE);
  process.loadEnvFile(process.env.ENV_FILE);
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
