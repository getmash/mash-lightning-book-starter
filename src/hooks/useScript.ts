import { useEffect, useState } from "react";

export enum State {
  Idle = "idle",
  Loading = "loading",
  Ready = "ready",
  Error = "error",
}

function useScript(src: string) {
  // Keep track of script status ("idle", "loading", "ready", "error")
  const [status, setStatus] = useState<State>(src ? State.Loading : State.Idle);

  useEffect(
    () => {
      // Allow falsy src value if waiting on other data needed for
      // constructing the script URL passed to this hook.
      if (!src) {
        setStatus(State.Idle);
        return;
      }

      // Fetch existing script element by src
      // It may have been added by another intance of this hook

      // @ts-ignore
      let script = document.querySelector<"script">(`script[src="${src}"]`);

      if (script) {
        const status = script.getAttribute("data-status") as State | null;
        setStatus(status || State.Ready);
      } else {
        script = document.createElement("script");
        script.src = src;
        script.defer = true;
        script.setAttribute("data-status", "loading");

        // Add script to document body
        document.body.appendChild(script);

        // Store status in attribute on script
        // This can be read by other instances of this hook
        const setAttributeFromEvent = event => {
          if (!script) return;
          script.setAttribute("data-status", event.type === "load" ? "ready" : "error");
        };
        script.addEventListener("load", setAttributeFromEvent);
        script.addEventListener("error", setAttributeFromEvent);
      }

      // Script event handler to update status in state
      // Note: Even if the script already exists we still need to add
      // event handlers to update the state for *this* hook instance.
      const setStateFromEvent = event => {
        setStatus(event.type === "load" ? State.Ready : State.Error);
      };

      // Add event listeners
      script.addEventListener("load", setStateFromEvent);
      script.addEventListener("error", setStateFromEvent);

      // Remove event listeners on cleanup
      return () => {
        if (script) {
          script.removeEventListener("load", setStateFromEvent);
          script.removeEventListener("error", setStateFromEvent);
        }
      };
    },
    [src], // Only re-run effect if script src changes
  );
  return status;
}

export default useScript;
