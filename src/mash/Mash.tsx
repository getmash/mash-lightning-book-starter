import * as React from "react";

import useSiteMetdata from "../queries/useSiteMetadata";
import useScript, { State } from "../hooks/useScript";

export interface Mash {
  init(): Promise<void>;
  access(resourceID: string): Promise<boolean>;
  userHasValidBudget(resourceID: string): Promise<boolean>;
}

type MashContextValue = {
  mash: Mash | null;
  ready: boolean;
};

const MashContext = React.createContext<MashContextValue>({
  mash: null,
  ready: false,
});

export default function MashProvider(props: React.PropsWithChildren<{}>) {
  const [mash, setMash] = React.useState<Mash | null>(null);

  const metadata = useSiteMetdata();
  const state = useScript("https://cdn.mash.com/mash/mash.js");

  React.useEffect(() => {
    window.MashSettings = {
      earnerID: metadata.mash.earnerID,
      options: {
        reactions: {
          target: "attribute",
          enabled: true,
        },
      },
    };
  }, []);

  React.useEffect(() => {
    if (state === State.Ready) {
      if (window.Mash) {
        window.Mash.init().then(() => {
          setMash(window.Mash!);
        });
      }
    }
  }, [state]);

  return <MashContext.Provider value={{ mash, ready: Boolean(mash) }}>{props.children}</MashContext.Provider>;
}

export function useMash() {
  const ctx = React.useContext(MashContext);
  return ctx;
}
