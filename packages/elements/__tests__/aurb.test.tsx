import type { AurbOrb } from "@aurb/player";

import { render } from "@testing-library/react";
import { createRef } from "react";

import { Aurb } from "../src/aurb";

const getOrb = (container: HTMLElement) => {
  const el = container.querySelector("aurb-orb");
  if (!el) {
    throw new Error("Expected an <aurb-orb> element to be rendered");
  }
  return el;
};

describe("aurb", () => {
  it("renders an aurb-orb with sensible defaults", () => {
    const { container } = render(<Aurb />);
    const el = getOrb(container);

    expect(el).toHaveAttribute("orb", "aurora");
    expect(el).toHaveAttribute("prefetch", "thinking,speaking");
    expect(el).toHaveClass("size-16", "shrink-0");
    expect(el).not.toHaveAttribute("transition");
    expect(el.state).toBe("idle");
  });

  it("is hidden from assistive technology by default", () => {
    const { container } = render(<Aurb />);

    expect(getOrb(container)).toHaveAttribute("aria-hidden", "true");
  });

  it("passes variant, state and className through", () => {
    const { container } = render(
      <Aurb className="size-32" state="thinking" variant="ember" />
    );
    const el = getOrb(container);

    expect(el).toHaveAttribute("orb", "ember");
    expect(el).toHaveClass("size-32");
    expect(el).not.toHaveClass("size-16");
    expect(el.state).toBe("thinking");
  });

  it("updates the state on rerender", () => {
    const { container, rerender } = render(<Aurb state="idle" />);
    rerender(<Aurb state="speaking" />);

    expect(getOrb(container).state).toBe("speaking");
  });

  it("uses the rest transition for solid orbs unless overridden", () => {
    const { container, rerender } = render(<Aurb variant="mercury" />);
    expect(getOrb(container)).toHaveAttribute("transition", "rest");

    rerender(<Aurb variant="ferro@1.0.0" />);
    expect(getOrb(container)).toHaveAttribute("transition", "rest");

    rerender(<Aurb transition={250} variant="bubble" />);
    expect(getOrb(container)).toHaveAttribute("transition", "250");
  });

  it("can be labelled when it is the only status cue", () => {
    const { getByRole } = render(
      <Aurb aria-label="Assistant is thinking" role="img" state="thinking" />
    );
    const el = getByRole("img", { name: "Assistant is thinking" });

    expect(el).not.toHaveAttribute("aria-hidden");
  });

  it("forwards the ref to the element", () => {
    const ref = createRef<AurbOrb>();
    render(<Aurb ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("AURB-ORB");
  });
});
