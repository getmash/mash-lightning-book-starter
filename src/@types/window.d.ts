import { Mash } from "../mash/Mash";

declare global {
  interface Window {
    Mash?: Mash;
  }
}

// Need to import/export at least 1 thing for TS to treat as module.
export {};
