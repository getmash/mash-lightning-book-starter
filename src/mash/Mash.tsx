import * as React from "react";

import useScript, { State } from "../hooks/useScript";
import useSiteMetdata from "../queries/useSiteMetadata";

type MashSettings = {
  id: string;
};

export type Mash = {
  isReady(): boolean;
  init(settings: MashSettings): Promise<void>;
  hasAccess(resourceID: string): Promise<boolean>;
  userHasValidBudget(resourceID: string): Promise<boolean>;
};

type MashContextValue = {
  mash: Mash | null;
  ready: boolean;
};

const MashContext = React.createContext<MashContextValue>({
  mash: null,
  ready: false,
});

export default function Mash(props: React.PropsWithChildren<{}>) {
  const [mash, setMash] = React.useState<Mash | null>(null);
  const [ready, setReadyStatus] = React.useState(false);

  const metadata = useSiteMetdata();
  const state = useScript(metadata.mash.sdk);

  React.useEffect(() => {
    if (state === State.Ready && window.Mash) {
      setMash(window.Mash);
    }
  }, [state]);

  React.useEffect(() => {
    if (!mash) return;
    mash.init({ id: metadata.mash.earnerID }).then(() => setReadyStatus(true));
  }, [mash]);

  return <MashContext.Provider value={{ mash, ready }}>{props.children}</MashContext.Provider>;
}

export function useMash() {
  const ctx = React.useContext(MashContext);
  return ctx;
}
