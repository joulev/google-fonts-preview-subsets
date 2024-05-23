import { Github } from "lucide-react";
import type { Metadata } from "next";

import { Button } from "~/components/ui/button";

import { Dropdown } from "./dropdown";
import data from "./v1/[font]/data.json";

export default function Page() {
  return (
    <div className="flex h-dvh w-dvw flex-row justify-center gap-4 py-24">
      <Dropdown fonts={data.map(x => ({ name: x.name, value: x.name.toLowerCase() }))} />
      <Button variant="outline" asChild>
        <a href="https://github.com/joulev/google-fonts-preview-subsets">
          Source
          <Github className="ml-2 h-4 w-4 shrink-0" />
        </a>
      </Button>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Google Fonts Preview Subsets",
};
