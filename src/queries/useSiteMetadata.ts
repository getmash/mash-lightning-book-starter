import { graphql, useStaticQuery } from "gatsby";

type FloatLocation = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center";

type MashBoostConfig = {
  icon: "lightning" | "heart" | "fire";
  variant: "dark" | "light" | "colorized";
  layoutMode: "inline" | "float";
  floatLocationDesktop: FloatLocation;
  floatLocationMobile: FloatLocation;
};

type MashConfig = {
  sdk: string;
  earnerID: string;
  resourceID: string;
  boosts: MashBoostConfig;
};

type Chapter = {
  number: number;
  title: string;
};

type SiteMetadata = {
  author: string;
  description: string;
  title: string;
  shortTitle: string;
  book: {
    amazon?: string;
    chapters: Chapter[];
  };
  siteUrl: string;
  social: { twitter: string; email: string };
  mash: MashConfig;
};

type Site = { site: { siteMetadata: SiteMetadata } };

const QUERY = graphql`
  query SiteMetadata {
    site {
      siteMetadata {
        author
        description
        siteUrl
        shortTitle
        title

        social {
          twitter
        }

        book {
          amazon
          chapters {
            number
            title
          }
        }

        mash {
          sdk
          earnerID
          resourceID
          boosts {
            icon
            variant
            layoutMode
            floatLocationDesktop
            floatLocationMobile
          }
        }
      }
    }
  }
`;

export default function useSiteMetdata() {
  const site = useStaticQuery<Site>(QUERY);
  return site.site.siteMetadata;
}
