// @ts-nocheck

import React from "react";
import { Helmet } from "react-helmet";
import useSiteMetdata from "../queries/useSiteMetadata";

export default function DonateButton() {
  const metadata = useSiteMetdata();

  return (
    <>
      <Helmet>
        <script defer src="https://components.getmash.com/donate/donate-btn.js"></script>
      </Helmet>
      <mash-donate-btn class="w-full max-w-xs" handle={metadata.mash.handle} size="sm" />
    </>
  );
}
