import { notFound } from "next/navigation";

import type { Params, RouteHandler } from "./$types";
import data from "./data.json";

export const GET: RouteHandler = (_, { params }) => {
  const fontName = params.font.replaceAll("+", " ");
  const font = data.find(item => item.name === fontName);
  if (!font) notFound();

  const buffer = Buffer.from(font.base64, "base64");
  return new Response(buffer, {
    headers: {
      "Content-Type": "font/woff2",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};

export function generateStaticParams(): Params[] {
  if (data.some(font => font.name.includes("+")))
    throw new Error("Font names cannot include the '+' character");
  return data.map(item => ({ font: item.name.replaceAll(" ", "+") }));
}
