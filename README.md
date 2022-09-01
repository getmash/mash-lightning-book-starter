# Mash Lightning Book Starter

Kick off your project with this blog boilerplate. This starter ships with the main Gatsby configuration files you might need to get up and running blazing fast with the blazing fast app generator for React.

## Quick start

1. **Install dependencies.**
  
    Simply run the following command

    ```shell
    yarn develop
    ```

2.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    yarn develop
    ```

3.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby Tutorial](https://www.gatsbyjs.com/docs/tutorial/part-4/#use-graphiql-to-explore-the-data-layer-and-write-graphql-queries)._

    Open the `my-blog-starter` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!

4. **Build Project**
   
    Simply run the following commands

    ```shell
    yarn clean && yarn build
    ```

    The build artifacts will be found in the public directory. This can be hosted in any static site hosting platform such as Firebase Hosting, Netlify, ...etc


## Configuration

### Mash Configuration

  Open `mash-config.ts` and populate with values that get can found in the Mash earner dashboard. [Earner Dashboard](https://wallet.getmash.com/earn). The SDK value should not change.

### Gatsby Config

  The `gatsby-config.ts` file contains some top level metadata. Populate the data in `siteMetadata` and it will be automatically loaded in the site. 

  The **chapters** key is important for loading the table of contents. Configure your chapters + titles here. This is used to properly configure the table of contents and the order of the book. Omiting this will cause problems and the book won't load properly.

### Book Content

  The book content is found in `content/book`

  The book is setup using Markdown. The top of each markdown file there should be a section which identifies metadata the components will use to pre-populate chapter and section data automatically.

  ```
  ---
  chapter: 0
  section: 0
  free: true
  title: Dedication
  slug: dedication
  ---
  ```

  `slug`: The URL that will be shown in the browser

  `free`: Boolean flag that will let the Paywall component know if this content should be automatically shown

  Chpater and section are used for ordering the book content correctly.

  **Chapter 0** is used as frontmatter for the book. It is helpful to use this chapter number to add pages such as Legal, Dedications. 

### Styling

The book uses TailwindCSS for general styles. TailwindCSS is configured using `tailwind.config.js` and `src/styles/global.css`

To change the styling of the book simplify modify `src/styles/style.css`. This contains the general style for the markdown text when it is rendered in react. 


## Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.com/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.com/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.com/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

