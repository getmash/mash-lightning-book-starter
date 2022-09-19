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

export function wrapPageElement(args: WrapPageElementBrowserArgs) {
  return <Mash>{args.element}</Mash>;
}
