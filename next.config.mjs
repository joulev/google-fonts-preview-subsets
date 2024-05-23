// @ts-check
import { withNextJSRouteTypes } from "nextjs-route-types";

/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export",
  headers: async () => [
    {
      source: "/v1/:path*",
      headers: [
        { key: "Access-Control-Allow-Origin", value: "*" },
        { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
      ],
    },
  ],
};

export default withNextJSRouteTypes(nextConfig);
