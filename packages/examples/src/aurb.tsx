"use client";

import type { AurbState, AurbVariant } from "@repo/elements/aurb";
import type { LucideIcon } from "lucide-react";

import { Aurb, aurbVariants } from "@repo/elements/aurb";
import { Button } from "@repo/shadcn-ui/components/ui/button";
import { ButtonGroup } from "@repo/shadcn-ui/components/ui/button-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/shadcn-ui/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/shadcn-ui/components/ui/tooltip";
import {
  BrainIcon,
  CircleCheckIcon,
  CircleIcon,
  CircleXIcon,
  EyeClosedIcon,
  MegaphoneIcon,
  MicIcon,
  WrenchIcon,
} from "lucide-react";
import { memo, useCallback, useState } from "react";

const states: {
  state: AurbState;
  icon: LucideIcon;
  label: string;
}[] = [
  { icon: CircleIcon, label: "Idle", state: "idle" },
  { icon: MicIcon, label: "Listening", state: "listening" },
  { icon: BrainIcon, label: "Thinking", state: "thinking" },
  { icon: WrenchIcon, label: "Working", state: "working" },
  { icon: MegaphoneIcon, label: "Speaking", state: "speaking" },
  { icon: CircleCheckIcon, label: "Success", state: "success" },
  { icon: CircleXIcon, label: "Error", state: "error" },
  { icon: EyeClosedIcon, label: "Asleep", state: "asleep" },
];

const isAurbVariant = (value: string): value is AurbVariant =>
  (aurbVariants as readonly string[]).includes(value);

interface StateButtonProps {
  state: (typeof states)[number];
  isActive: boolean;
  onStateChange: (state: AurbState) => void;
}

const StateButton = memo(
  ({ state, isActive, onStateChange }: StateButtonProps) => {
    const handleClick = useCallback(
      () => onStateChange(state.state),
      [onStateChange, state.state]
    );

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            aria-label={state.label}
            aria-pressed={isActive}
            onClick={handleClick}
            size="icon-sm"
            variant={isActive ? "default" : "outline"}
          >
            <state.icon className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{state.label}</TooltipContent>
      </Tooltip>
    );
  }
);

StateButton.displayName = "StateButton";

const Example = () => {
  const [currentState, setCurrentState] = useState<AurbState>("idle");
  const [variant, setVariant] = useState<AurbVariant>("aurora");

  const handleStateChange = useCallback((state: AurbState) => {
    setCurrentState(state);
  }, []);

  const handleVariantChange = useCallback((value: string) => {
    if (isAurbVariant(value)) {
      setVariant(value);
    }
  }, []);

  return (
    <div className="flex size-full flex-col items-center justify-center gap-4">
      <Aurb className="size-32" state={currentState} variant={variant} />

      <ButtonGroup aria-label="Aurb state" orientation="horizontal">
        {states.map((state) => (
          <StateButton
            isActive={currentState === state.state}
            key={state.state}
            onStateChange={handleStateChange}
            state={state}
          />
        ))}
      </ButtonGroup>

      <Select onValueChange={handleVariantChange} value={variant}>
        <SelectTrigger
          aria-label="Aurb variant"
          className="w-40 capitalize"
          size="sm"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {aurbVariants.map((name) => (
            <SelectItem className="capitalize" key={name} value={name}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Example;
