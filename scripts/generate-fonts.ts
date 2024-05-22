/* eslint-disable no-console -- This is a script, console functions are fine */
import fs from "node:fs/promises";
import subsetFont from "subset-font";

import type { WebfontFamily, WebfontList } from "~/types/extends/google-font-api";

async function loadFontInfo() {
  const url = new URL("https://www.googleapis.com/webfonts/v1/webfonts");
  url.searchParams.set("key", process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY ?? "");
  url.searchParams.set("sort", "alpha");
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to load fonts from the Google Fonts API");
  const data = (await res.json()) as WebfontList;
  return data;
}

function getFontFileUrl(webfont: WebfontFamily) {
  const variant = webfont.variants?.includes("regular") ? "regular" : webfont.variants?.[0];
  if (!variant) throw new Error(`No variant found for font ${webfont.family}`);
  return webfont.files[variant];
}

async function generateFontSubset(webfont: WebfontFamily) {
  try {
    const fullFontBuffer = Buffer.from(
      await fetch(getFontFileUrl(webfont)).then(res => res.arrayBuffer()),
    );
    return subsetFont(fullFontBuffer, webfont.family, { targetFormat: "woff2" });
  } catch {
    console.warn(`Failed to generate subset for ${webfont.family}, skipping this font.`);
    return null;
  }
}

async function main() {
  const fontList = await loadFontInfo();

  const fonts: { name: string; base64: string }[] = [];
  const failedFonts: string[] = [];

  const generatedLength = process.env.DEBUG ? 10 : fontList.items.length;
  for (let i = 0; i < generatedLength; i++) {
    const key = `(${i.toString().padStart(4)}/${fontList.items.length}) ${fontList.items[i].family}`;
    console.time(key);
    const buffer = await generateFontSubset(fontList.items[i]);
    if (!buffer) failedFonts.push(fontList.items[i].family);
    else fonts.push({ name: fontList.items[i].family, base64: buffer.toString("base64") });
    console.timeEnd(key);
  }

  if (failedFonts.length)
    console.log(`The following fonts failed to generate a subset: ${failedFonts.join(", ")}`);
  else console.log("All fonts were successfully generated.");

  await fs.writeFile("src/app/v1/[font]/data.json", JSON.stringify(fonts));
}

void main();
