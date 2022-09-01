import path from "path";

export const createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Define a template for blog post
  const chapterPage = path.resolve(`./src/templates/Chapter.tsx`);

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { frontmatter: { chapter: { gte: 0 } } }
          sort: { fields: [frontmatter___chapter, frontmatter___section], order: [ASC, ASC] }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
            frontmatter {
              chapter
            }
          }
        }
      }
    `,
  );

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your blog posts`, result.errors);
    return;
  }

  const chapters = result.data.allMarkdownRemark.nodes;

  if (chapters.length === 0) return;

  chapters.forEach((chapter, idx) => {
    const prevId = idx === 0 ? null : chapters[idx - 1].id;
    const nextId = idx === chapters.length - 1 ? null : chapters[idx + 1].id;

    createPage({
      path: chapter.fields.slug,
      component: chapterPage,
      context: {
        id: chapter.id,
        prevId,
        nextId,
      },
    });
  });
};

export const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
  
    type SiteSiteMeta {
      author: String
      copyright: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      chapter: Int
      section: Int
      title: String
    }

    type Fields {
      slug: String
    }
  `);
};
