// @ts-check
import { withNextJSRouteTypes } from "nextjs-route-types";

/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export",
};

export default withNextJSRouteTypes(nextConfig);
