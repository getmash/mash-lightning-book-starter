import * as React from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link, graphql, PageProps, navigate } from "gatsby";

import { useMash } from "../mash/Mash";
import Paywall, { Chapter } from "../mash/Paywall";
import QuickNav from "../components/QuickNav";
import Seo from "../components/Seo";
import { useSizeDocumentBody } from "../hooks/useSizeDocumentBody";

const LEFT_KEY = "ArrowLeft";
const RIGHT_KEY = "ArrowRight";

type PageQueryData = {
  site: { siteMetadata: { shortTitle: string; chapters: { number: number; title: string }[] } };
  markdownRemark: Chapter;
  next: { fields: { slug: string }; frontmatter: { chapter: number; section: number; title } } | null;
  prev: { fields: { slug: string }; frontmatter: { chapter: number; section: number; title } } | null;
};

function ChapterTemplate(props: PageProps<PageQueryData>) {
  const { mash } = useMash();

  const { site, markdownRemark, next, prev } = props.data;

  const chapterMap = site.siteMetadata.chapters.reduce<{
    [num: string]: { number: number; title: string };
  }>((map, cur) => {
    map[cur.number] = cur;
    return map;
  }, {});

  React.useEffect(() => {
    const onKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === LEFT_KEY && prev?.fields.slug) {
        navigate(prev.fields.slug);
        return;
      }

      if (evt.key === RIGHT_KEY && next?.fields.slug) {
        navigate(next.fields.slug);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useSizeDocumentBody();

  if (!mash) return null;

  return (
    <>
      <Seo title={markdownRemark.frontmatter.title} />
      <div className="page overflow-hidden flex flex-col h-full">
        <div className="header py-4 px-8 border font-bold flex items-center justify-between">
          <Link to="/" className="text-black hover:underline">
            {site.siteMetadata.shortTitle}
          </Link>
          <QuickNav currentHref={props.path} />
        </div>
        <div className="h-full w-full flex flex-col overflow-auto">
          <article className="max-w-reading w-full m-auto px-4 pt-2 pb-8">
            <Paywall chapter={markdownRemark} />
          </article>
          {next && (
            <div className="footer py-6 w-full border-t">
              <div className="footer-content max-w-reading m-auto flex justify-between items-center pl-4 pr-20">
                <div className="next-info text-sm">
                  <div className="font-bold">
                    Next {markdownRemark.frontmatter.chapter === next?.frontmatter.chapter ? "Section" : "Chapter"}:
                  </div>
                  <div>
                    {markdownRemark.frontmatter.chapter === next?.frontmatter.chapter
                      ? next?.frontmatter.title
                      : chapterMap[next.frontmatter.chapter]?.title || ""}
                  </div>
                </div>
                <Link
                  to={next?.fields.slug}
                  className="block rounded-full bg-black px-5 py-2 font-bold text-white flex items-center gap-1 hover:bg-slate-500 active:bg-slate-700 max-h-11 sans-serif"
                >
                  Next
                  <FaChevronRight />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ChapterTemplate;

export const pageQuery = graphql`
  query ChapterBySlug($id: String!, $prevId: String, $nextId: String) {
    site: site {
      siteMetadata {
        shortTitle
        chapters {
          number
          title
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        free
        chapter
        section
        title
      }
    }
    prev: markdownRemark(id: { eq: $prevId }) {
      fields {
        slug
      }
      frontmatter {
        chapter
        section
        title
      }
    }
    next: markdownRemark(id: { eq: $nextId }) {
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
`;
