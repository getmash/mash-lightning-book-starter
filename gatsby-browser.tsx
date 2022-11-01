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

import Mash from "./src/mash/Mash";

export function wrapPageElement(args: WrapPageElementBrowserArgs) {
  return <Mash>{args.element}</Mash>;
}
