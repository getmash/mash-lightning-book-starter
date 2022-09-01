import * as React from "react";
import { WrapPageElementBrowserArgs } from "gatsby";

// custom typefaces
import "typeface-montserrat";
import "typeface-merriweather";

// custom CSS styles
import "./src/styles/global.css";
import "./src/styles/style.css";

// Highlighting for code blocks
import "prismjs/themes/prism.css";

import Mash, { useMash } from "./src/mash/Mash";
import LoadingSpinner from "./src/components/LoadingSpinner";

const MashReadyCheck = (props: React.PropsWithChildren<{}>) => {
  const { ready, mash } = useMash();

  if (!ready || !mash) {
    return (
      <div className="max-w-6xl mx-auto p-12 h-full flex flex-col">
        <div className="flex justify-center items-center h-full">
          <LoadingSpinner height={42} width={42} />
        </div>
      </div>
    );
  }

  return <>{props.children}</>;
};

export function wrapPageElement(args: WrapPageElementBrowserArgs) {
  return (
    <Mash>
      <MashReadyCheck>{args.element}</MashReadyCheck>
    </Mash>
  );
}
