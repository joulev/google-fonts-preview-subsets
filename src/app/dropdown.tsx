"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useCallback, useState } from "react";
import { Virtuoso } from "react-virtuoso";

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
    >
      <Check
        className={cn("mr-2 h-4 w-4", value === fonts[index].value ? "opacity-100" : "opacity-0")}
      />
      {fonts[index].name}
    </CommandItem>
  );
}

export function Dropdown({ fonts }: { fonts: { name: string; value: string }[] }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const itemContent = useCallback(
    (index: number) => (
      <VirtualListItem
        index={index}
        fonts={fonts}
        value={value}
        setValue={setValue}
        setOpen={setOpen}
      />
    ),
    [fonts, value, setValue, setOpen],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-72 justify-between"
        >
          {value ? fonts.find(item => item.value === value)?.name : "Select font..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            <Virtuoso style={{ height: 305 }} totalCount={fonts.length} itemContent={itemContent} />
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
