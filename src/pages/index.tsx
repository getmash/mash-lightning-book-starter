import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import { FaAmazon, FaBookOpen, FaEnvelope, FaTwitter } from "react-icons/fa";

import { useMash } from "../mash/Mash";
import { useSizeDocumentBody } from "../hooks/useSizeDocumentBody";
import useTableOfContents from "../queries/useTableOfContents";
import Seo from "../components/Seo";
import useSiteMetdata from "../queries/useSiteMetadata";
import DonateButton from "../mash/DonateButton";
import BoostButton from "../mash/BoostButton";

function BookIndex() {
  const { ready } = useMash();

  const metadata = useSiteMetdata();
  const toc = useTableOfContents();

  useSizeDocumentBody();

  return (
    <>
      <Seo />
      <BoostButton />
      <div className="page overflow-hidden flex flex-col h-full" style={{ visibility: !ready ? "hidden" : "visible" }}>
        <div
          className="header py-4 px-8 border font-bold text-sm sm:text-base flex items-center"
          style={{ minHeight: 64 }}
        >
          {toc.title}
        </div>
        <div className="overflow-auto pt-8 px-8">
          <div className="grid-container grid grid-cols-1 sm:grid-cols-normal h-full w-full max-w-6xl m-auto">
            <div className="grid-left-col flex flex-col items-center gap-6 mb-8 sm:mb-0">
              <div className="img-wrapper">
                <StaticImage src="../images/book_cover.png" alt="Mash" height={350} />
              </div>
              <div className="buttons-wrapper flex flex-col gap-4 w-full justify-center items-center">
                <Link
                  className="flex gap-2 justify-center items-center py-2 px-8 border rounded-full w-full text-center block max-w-xs hover:bg-slate-100 active:bg-slate-200 text-black sans-serif font-medium"
                  to={toc.chapters[0].link || toc.chapters[0].sections[0].link}
                >
                  <FaBookOpen />
                  Read Online
                </Link>
                {metadata.book.amazon && (
                  <a
                    className="flex gap-2 justify-center items-center py-2 px-8 border rounded-full w-full text-center block max-w-xs hover:bg-slate-100 active:bg-slate-200 text-black sans-serif font-medium"
                    href={metadata.book.amazon}
                    target="_blank"
                  >
                    <FaAmazon />
                    Buy on Amazon
                  </a>
                )}
                <DonateButton />
              </div>
              <div className="w-full border max-w-xs rounded-full" />

              <div className="flex items-center justify-evenly w-full max-w-xs">
                <a
                  aria-label={`Twitter: ${metadata.social.twitter}`}
                  className="flex gap-2 justify-center items-center p-2 border rounded-full w-full text-center block hover:bg-slate-100 active:bg-slate-200 text-black"
                  href={`https://twitter.com/${metadata.social.twitter}`}
                  target="_blank"
                  style={{ width: 42, height: 42 }}
                >
                  <FaTwitter />
                </a>

                <a
                  aria-label={`Email: ${metadata.social.email}`}
                  className="flex gap-2 justify-center items-center p-2 border rounded-full w-full text-center block hover:bg-slate-100 active:bg-slate-200 text-black"
                  href={`mailto:${metadata.social.email}`}
                  target="_blank"
                  style={{ width: 42, height: 42 }}
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>
            <div className="grid-right-col px-0 sm:px-8" style={{ paddingBottom: "4rem" }}>
              <div className="desc mb-8">
                <h3 className="mt-0">Description</h3>
                <p>{metadata.description}</p>
              </div>
              <div className="border my-8" />
              <div className="toc">
                {toc.chapters.map(chapter => (
                  <div key={chapter.title} className="chapter-wrapper">
                    <div className="chapter mb-4">
                      <Link
                        to={chapter.link || chapter.sections[0].link}
                        className="mb-4 text-lg font-bold text-black hover:underline"
                      >
                        {chapter.sections.length === 0 ? "" : `Chapter ${chapter.number}:`} {chapter.title}
                      </Link>
                    </div>
                    {chapter.sections.length > 1 && (
                      <ol className="sections border rounded-lg divide-y list-none p-0 ml-0">
                        {chapter.sections.map(section => (
                          <li className="m-0 p-0" key={`${section.number}-${section.title}`}>
                            <Link
                              key={section.link}
                              to={section.link}
                              className="section py-4 px-8 mb-0 block hover:bg-slate-100 active:bg-slate-200 text-black"
                            >
                              {chapter.number}.{section.number} {section.title}
                            </Link>
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookIndex;
