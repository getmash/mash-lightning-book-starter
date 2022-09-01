import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Mash Lightning Book: Quick Starter Template",
    shortTitle: "Mash Lightning Book",
    author: "Mike Dedys",
    description:
      "This timely tale is packed with striking imagery and descriptions, highlighting how Bitcoin is upending everything we thought we knew about money, and drawing attention to issues plaguing our current monetary system.",
    chapters: [
      {
        number: 1,
        title: "Lorem Ipsum",
      },
      {
        number: 2,
        title: "Why Lorem Ipsum",
      },
    ],
    siteUrl: "https://loremipsumbook.com/",
    social: {
      twitter: "getmash",
    },
  },
  plugins: [
    // Adds drop-in support for making a Gatsby site work offline and more resistant to bad network connections.
    "gatsby-plugin-offline",

    // Provides drop-in support for server rendering data added with React Helmet
    "gatsby-plugin-react-helmet",

    // Provides drop-in support for PostCSS
    "gatsby-plugin-postcss",

    // Adds web app manifest support.
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Lorem Ipsum",
        short_name: "Lorem",
        start_url: "/",
        background_color: "#ffffff",
        display: "minimal-ui",
        icon: "src/images/favicon.png",
      },
    },
    // Handles producing images in multiple sizes and formats to keep site performance high
    "gatsby-plugin-image",

    // Sources book data into gatsby application from local filesystem.
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/book`,
        name: "book",
      },
    },

    // Sources image data into gatsby application from local filesystem.
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/images`,
        name: "images",
      },
    },

    // Parses Markdown files using remark
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            // Processes images in markdown so they can be used in production build.
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 630,
            },
          },
          {
            // Wrap iframes of objects within markdown files in responsive elastic container. Ensures
            // the iframe or object will scale proportionally.
            resolve: "gatsby-remark-responsive-iframe",
            options: {
              wrapperStyle: "margin-bottom: 1.0725rem",
            },
          },

          // Adds syntax highlighting to code blocks in markdown files
          "gatsby-remark-prismjs",

          // Copies local files linked to/from Markdown (.md|.markdown) files to the root directory (i.e., public folder).
          "gatsby-remark-copy-linked-files",

          // Replaces “dumb” punctuation marks with “smart” punctuation marks using the retext-smartypants plugin
          "gatsby-remark-smartypants",
        ],
      },
    },

    // Creates ImageSharp nodes from image types that are supported by the Sharp image processing library and provides fields in
    // their GraphQL types for processing your images in a variety of ways including resizing, cropping, and creating responsive images.
    "gatsby-transformer-sharp",

    // Exposes several image processing functions built on the Sharp image processing library. This is a low-level
    // helper plugin generally used by other Gatsby plugins.
    "gatsby-plugin-sharp",

    // Allows adding a custom defined slug field to markdown
    "gatsby-plugin-slug",
  ],
};

export default config;
