// @ts-nocheck

import * as React from "react";
import { Helmet } from "react-helmet";
import { isMobile } from "react-device-detect";
import useSiteMetdata from "../queries/useSiteMetadata";

export default function BoostButton() {
  const metadata = useSiteMetdata();

  return (
    <mash-boost-button
      icon={metadata.mash.boosts.icon}
      layout-mode={metadata.mash.boosts.layoutMode}
      float-location={isMobile ? metadata.mash.boosts.floatLocationMobile : metadata.mash.boosts.floatLocationDesktop}
      variant={metadata.mash.boosts.variant}
    ></mash-boost-button>
  );
}
