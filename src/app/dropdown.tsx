"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { type ListItem, Virtuoso } from "react-virtuoso";

import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { cn } from "~/lib/utils";

interface Font {
  name: string;
  value: string;
}

function getCssFontName(font: Font) {
  return `font-picker-${font.value.replaceAll(" ", "+")}`;
}

function getFontUrl(font: Font) {
  return `/v1/${font.name.replaceAll(" ", "+")}`;
}

function VirtualListItem({
  index,
  fonts,
  value,
  setValue,
  setOpen,
}: {
  index: number;
  fonts: { name: string; value: string }[];
  value: string;
  setValue: (value: string) => void;
  setOpen: (open: boolean) => void;
}) {
  return (
    <CommandItem
      value={fonts[index].value}
      onSelect={currentValue => {
        setValue(currentValue === value ? "" : currentValue);
        setOpen(false);
      }}
      style={{ fontFamily: `'${getCssFontName(fonts[index])}', var(--font-sans)` }}
    >
      <Check
        className={cn("mr-2 h-4 w-4", value === fonts[index].value ? "opacity-100" : "opacity-0")}
      />
      <span className="truncate">{fonts[index].name}</span>
    </CommandItem>
  );
}

export function Dropdown({ fonts }: { fonts: Font[] }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const loadedFonts = useRef<Set<string> | null>(null);

  function getLoadedFonts() {
    if (!loadedFonts.current) loadedFonts.current = new Set();
    return loadedFonts.current;
  }

  const filteredFonts = useMemo(() => {
    if (!search) return fonts;
    return fonts.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  }, [fonts, search]);

  const itemContent = useCallback(
    (index: number) => (
      <VirtualListItem
        index={index}
        fonts={filteredFonts}
        value={value}
        setValue={setValue}
        setOpen={setOpen}
      />
    ),
    [filteredFonts, value, setValue, setOpen],
  );

  const onItemsRendered = useCallback(async (items: ListItem<Font>[]) => {
    const loadedFontsSet = getLoadedFonts();
    await Promise.all(
      items.map(async item => {
        if (!item.data) return;
        const font = item.data;
        const cssFontName = getCssFontName(font);
        if (loadedFontsSet.has(cssFontName)) return;

        const fontface = new FontFace(cssFontName, `url(${getFontUrl(font)})`);
        await fontface.load();
        document.fonts.add(fontface);
        loadedFontsSet.add(cssFontName);
      }),
    );
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-60 justify-between"
        >
          {value ? fonts.find(item => item.value === value)?.name : "Select font..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-0">
        <Command shouldFilter={false}>
          <CommandInput placeholder="Search font..." value={search} onValueChange={setSearch} />
          <CommandEmpty>No font found.</CommandEmpty>
          <CommandGroup>
            <Virtuoso
              style={{ height: 305 }}
              data={filteredFonts}
              itemContent={itemContent}
              increaseViewportBy={300}
              itemsRendered={items => void onItemsRendered(items)}
            />
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
