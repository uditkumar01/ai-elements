"use client";

import type { AurbState } from "@repo/elements/aurb";

import { Aurb, aurbStates, aurbVariants } from "@repo/elements/aurb";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@repo/shadcn-ui/components/ui/toggle-group";
import { useCallback, useState } from "react";

const isAurbState = (value: string): value is AurbState =>
  (aurbStates as readonly string[]).includes(value);

const Example = () => {
  const [state, setState] = useState<AurbState>("idle");

  const handleStateChange = useCallback((value: string) => {
    // A single ToggleGroup emits "" when the active item is clicked again.
    if (isAurbState(value)) {
      setState(value);
    }
  }, []);

  return (
    <div className="flex size-full flex-col items-center justify-center gap-6">
      <ToggleGroup
        aria-label="Aurb state"
        className="flex-wrap justify-center"
        onValueChange={handleStateChange}
        size="sm"
        type="single"
        value={state}
        variant="outline"
      >
        {aurbStates.map((name) => (
          <ToggleGroupItem className="capitalize" key={name} value={name}>
            {name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <div className="grid grid-cols-3 gap-6 sm:grid-cols-5">
        {aurbVariants.map((variant) => (
          <figure className="flex flex-col items-center gap-2" key={variant}>
            <Aurb state={state} variant={variant} />
            <figcaption className="text-muted-foreground text-xs capitalize">
              {variant}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};

export default Example;
