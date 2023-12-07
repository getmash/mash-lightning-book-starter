// @ts-nocheck

import React from "react";
import useSiteMetdata from "../queries/useSiteMetadata";

export default function DonateButton() {
  return (
    <button
      style={{
        height: 42,
        padding: "0 16px",
        backgroundColor: "rgb(134, 127, 155)",
        width: "100%",
        borderRadius: 30,
        maxWidth: "20rem",
        color: "white",
        fontFamily: "sans-serif",
      }}
      onClick={() => {
        window.Mash.donate();
      }}
    >
      Donate
    </button>
  );
}
