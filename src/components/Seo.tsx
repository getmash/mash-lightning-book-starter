/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

export const constructUrl = (baseUrl, path) => (!baseUrl || !path ? null : `${baseUrl}${path}`);

type SeoProps = {
  description?: string;
  lang?: string;
  meta?: (
    | {
        name: string;
        content: any;
        property?: undefined;
      }
    | {
        property: string;
        content: any;
        name?: undefined;
      }
  )[];
  title?: string;
};

const Seo = ({ description, lang, meta, title }: SeoProps) => {
  const { site, ogImageDefault } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
            siteUrl
          }
        }
        ogImageDefault: file(relativePath: { eq: "twitter_banner.png" }) {
          childImageSharp {
            fixed(height: 630, width: 1200) {
              src
            }
          }
        }
      }
    `,
  );

  const metaDescription = description || site.siteMetadata.description;
  const pageTitle = title || site.siteMetadata?.title;
  const image = constructUrl(site.siteMetadata.siteUrl, ogImageDefault?.childImageSharp?.fixed?.src);

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={pageTitle}
      pageTitleTemplate={pageTitle ? `%s | ${pageTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: pageTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.social?.twitter || ``,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: "twitter:image",
          content: image,
        },
        {
          name: "og:image",
          content: image,
        },
      ].concat(meta || [])}
    />
  );
};

export default Seo;
