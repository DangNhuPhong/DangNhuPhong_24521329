import { useEffect } from "react";

export function useDrumKeyboard(padMap, trigger, release, enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;

    const ignore = (event) => {
      return (
        event.isComposing ||
        event.target?.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(event.target?.tagName)
      );
    };

    const handleKeyDown = (event) => {
      if (event.repeat || ignore(event)) return;

      const pad = padMap.get(event.code);
      if (!pad) return;

      event.preventDefault();
      trigger(pad);
    };

    const handleKeyUp = (event) => {
      const pad = padMap.get(event.code);
      if (pad) release(pad.id);
    };

    window.addEventListener("keydown", handleKeyDown);

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [padMap, trigger, release, enabled]);
}
