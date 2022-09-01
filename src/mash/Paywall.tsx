import HTMLReactParser from "html-react-parser";
import * as React from "react";

import LoadingSpinner from "../components/LoadingSpinner";
import { useMash } from "./Mash";
import LocalStorage from "./LocalStorage";
import mashConfig from "../../mash-config";

export type Chapter = {
  id: string;
  html: string;
  frontmatter: {
    chapter: number;
    section: number;
    title: string;
    free: boolean;
  };
};

enum ContentState {
  Loading = "loading",
  Locked = "locked",
  UnLocked = "unlocked",
}

type PaywallProps = {
  chapter: Chapter;
};

const key = (id: string) => `mim_${id}`;

export default function Paywall(props: PaywallProps) {
  const { mash } = useMash();

  const [state, setState] = React.useState(ContentState.Locked);

  const access = () => {
    if (!mash) {
      // handle error
      return;
    }

    setState(ContentState.Loading);

    mash
      .hasAccess(mashConfig.resourceID)
      .then(result => {
        if (result) {
          LocalStorage.set(key(props.chapter.id), true);
          setState(ContentState.UnLocked);
          return;
        }
        setState(ContentState.Locked);
      })
      .catch(() => {
        setState(ContentState.Locked);
      });
  };

  const onClickUnlock = () => {
    access();
  };

  const paid = LocalStorage.get(key(props.chapter.id));

  React.useLayoutEffect(() => {
    if (paid) {
      setState(ContentState.UnLocked);
      return;
    }

    if (mash) {
      mash
        .userHasValidBudget(mashConfig.resourceID)
        .then(res => {
          if (res) {
            access();
          }
        })
        .catch(err => console.log(err));
    }
  }, [mash, paid]);

  if (state === ContentState.UnLocked || props.chapter.frontmatter.free || paid) {
    return <>{HTMLReactParser(props.chapter.html)}</>;
  }

  return (
    <div className="paywall-wrapper flex w-full justify-center  p-8 h-full">
      <div className="paywall flex flex-col justify-center items-center">
        {state === ContentState.Locked && (
          <>
            <h4 className="text-center" style={{ maxWidth: "22rem" }}>
              Enjoy some free chapters each month, then pay-to-enjoy
            </h4>
            <h5 className="text-center text-slate-400 mt-0" style={{ maxWidth: "20rem" }}>
              Setting a budget will auto unlock content as you read.
            </h5>
            <button
              className="px-8 py-2 border rounded-lg bg-black hover:bg-slate-500 active:bg-slate-700 text-white font-bold sans-serif"
              onClick={onClickUnlock}
            >
              Unlock Content
            </button>
          </>
        )}
        {state === ContentState.Loading && (
          <>
            <h4>Unlocking Content</h4>
            <LoadingSpinner height={32} width={32} />
          </>
        )}
      </div>
    </div>
  );
}
