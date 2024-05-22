// https://www.npmjs.com/package/@types/google.fonts

export interface WebfontList {
  kind: string;
  items: WebfontFamily[];
}

export interface WebfontFamily {
  category?: string | undefined;
  kind: string;
  family: string;
  subsets: string[];
  variants?: string[];
  version: string;
  lastModified: string;
  files: Record<string, string>;
}
