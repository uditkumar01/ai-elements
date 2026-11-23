"use client";

import type { ComponentProps } from "react";

// Enables transition="rest", which the ferro, mercury and bubble orbs need.
import "@aurb/player/rest";
import { Aurb as AurbPlayer } from "@aurb/player/react";
import { cn } from "@repo/shadcn-ui/lib/utils";

export const aurbVariants = [
  "aurora",
  "chalk",
  "lattice",
  "pearl",
  "mist",
  "nova",
  "ember",
  "lagoon",
  "iris",
  "rose",
  "moss",
  "signal",
  "ferro",
  "mercury",
  "bubble",
] as const;

export type AurbVariant = (typeof aurbVariants)[number];

export const aurbStates = [
  "idle",
  "listening",
  "thinking",
  "working",
  "speaking",
  "success",
  "error",
  "asleep",
] as const;

export type AurbState = (typeof aurbStates)[number];

// These orbs are solid bodies that move through a rest pose between states.
const restVariants = new Set<string>(["ferro", "mercury", "bubble"]);

const getDefaultTransition = (variant: string) => {
  // Strip a pinned version, e.g. "ferro@1.0.0" -> "ferro".
  const [name] = variant.split("@", 1);
  return restVariants.has(name) ? "rest" : undefined;
};

export type AurbProps = Omit<
  ComponentProps<typeof AurbPlayer>,
  "orb" | "state"
> & {
  /** One of the built-in orbs, a pinned version, a community package or a self-hosted folder URL. */
  variant?:
    | AurbVariant
    // oxlint-disable-next-line typescript-eslint(ban-types) -- intentional pattern for autocomplete-friendly string union
    | (string & {});
  state?: AurbState;
};

export const Aurb = ({
  className,
  variant = "aurora",
  state = "idle",
  prefetch = "thinking,speaking",
  transition = getDefaultTransition(variant),
  ...props
}: AurbProps) => (
  <AurbPlayer
    className={cn("size-16 shrink-0", className)}
    orb={variant}
    prefetch={prefetch}
    state={state}
    transition={transition}
    {...props}
  />
);
