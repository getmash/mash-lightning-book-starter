import { graphql, useStaticQuery } from "gatsby";

const QUERY = graphql`
  query TableOfContents {
    site: site {
      siteMetadata {
        title
        book {
          chapters {
            number
            title
          }
        }
      }
    }

    book: allMarkdownRemark(
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
`;

type Query = {
  site: {
    siteMetadata: {
      title: string;
      book: {
        chapters: { number: number; title: string }[];
      };
    };
  };
  book: {
    edges: {
      node: {
        id: string;
        fields: { slug: string };
        frontmatter: { chapter: number; section: number; title: string };
      };
    }[];
  };
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

export default function useTableOfContents(): TableOfContents {
  const query = useStaticQuery<Query>(QUERY);

  const chapterMap = query.site.siteMetadata.book.chapters.reduce<{ [num: string]: { number: number; title: string } }>(
    (map, cur) => {
      map[cur.number] = cur;
      return map;
    },
    {},
  );

  const chapters: Chapter[] = query.site.siteMetadata.book.chapters.map(chapter => ({
    number: chapter.number,
    title: chapter.title,
    sections: [],
    order: 1,
  }));

  const chapterToSections: Map<number, Section[]> = new Map();

  query.book.edges.forEach(({ node }) => {
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
