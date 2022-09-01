import { graphql, useStaticQuery } from "gatsby";

type TableMarkdownNode = {
  id: string;
  fields: { slug: string };
  frontmatter: { chapter: number; section: number; title: string };
};

type TableAllMarkdownEdge = {
  node: TableMarkdownNode;
};

type TOCQueryData = {
  site: {
    siteMetadata: {
      title: string;
      chapters: {
        number: number;
        title: string;
      }[];
    };
  };
  table: {
    edges: TableAllMarkdownEdge[];
  };
};

export type TableOfContentsEntry = {
  title: string;
  link?: string;
};

type Section = {
  number: number;
  title: string;
  link: string;
};

type Chapter = {
  order: number;
  number: number;
  title: string;
  link?: string;
  sections: Section[];
};

export type TableOfContents = {
  title: string;
  chapters: Chapter[];
};

export function useStaticTableOfContents(): TableOfContents {
  const query = useStaticQuery<TOCQueryData>(graphql`
    query TableOfContents {
      site: site {
        siteMetadata {
          title
          chapters {
            number
            title
          }
        }
      }

      table: allMarkdownRemark(
        filter: { frontmatter: { chapter: { gte: 0 } } }
        sort: { fields: [frontmatter___chapter, frontmatter___section], order: [ASC, ASC] }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              chapter
              section
              title
            }
          }
        }
      }
    }
  `);

  const chapterMap = query.site.siteMetadata.chapters.reduce<{ [num: string]: { number: number; title: string } }>(
    (map, cur) => {
      map[cur.number] = cur;
      return map;
    },
    {},
  );

  const chapters: Chapter[] = query.site.siteMetadata.chapters.map(chapter => ({
    number: chapter.number,
    title: chapter.title,
    sections: [],
    order: 1,
  }));

  const chapterToSections: Map<number, Section[]> = new Map();

  query.table.edges.forEach(({ node }) => {
    const chapter = chapterMap[node.frontmatter.chapter];

    if (!chapter) {
      chapters.push({
        number: node.frontmatter.chapter,
        title: node.frontmatter.title,
        link: node.fields.slug,
        sections: [],
        order: node.frontmatter.section,
      });
      return;
    }

    const existing = chapterToSections.get(node.frontmatter.chapter);

    const section: Section = {
      number: node.frontmatter.section,
      title: node.frontmatter.title,
      link: node.fields.slug,
    };

    chapterToSections.set(node.frontmatter.chapter, existing ? [...existing, section] : [section]);
  });

  return {
    title: query.site.siteMetadata.title,
    chapters: chapters
      .map(chapter => {
        return { ...chapter, sections: chapterToSections.get(chapter.number) || [] } as Chapter;
      })
      .sort((a, b) => {
        if (a.number === b.number) {
          return a.order - b.order;
        }
        return a.number - b.number;
      }),
  };
}
