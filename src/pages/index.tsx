import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "gatsby";

import { StaticImage } from "gatsby-plugin-image";
import { useStaticTableOfContents } from "../queries";
import { FaAmazon, FaBookOpen, FaEnvelope, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import Seo from "../components/Seo";
import { useMash } from "../mash/Mash";
import mashConfig from "../../mash-config";
import { useSizeDocumentBody } from "../hooks/useSizeDocumentBody";

function BookIndex() {
  const { ready } = useMash();

  const toc = useStaticTableOfContents();

  useSizeDocumentBody();

  return (
    <>
      <Seo />
      <Helmet>
        <script async src="https://components.getmash.com/donate/donate-btn.js"></script>
      </Helmet>
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
                <a
                  className="flex gap-2 justify-center items-center py-2 px-8 border rounded-full w-full text-center block max-w-xs hover:bg-slate-100 active:bg-slate-200 text-black sans-serif font-medium"
                  href="https://someamazonbooklink.com"
                  target="_blank"
                >
                  <FaAmazon />
                  Buy on Amazon
                </a>
                <mash-donate-btn class="w-full max-w-xs" handle={mashConfig.earnerID} size="sm" />
              </div>
              <div className="w-full border max-w-xs rounded-full" />

              <div className="flex items-center justify-evenly w-full max-w-xs">
                <a
                  className="flex gap-2 justify-center items-center p-2 border rounded-full w-full text-center block hover:bg-slate-100 active:bg-slate-200 text-black"
                  href="https://twitter.com/getmash"
                  target="_blank"
                  style={{ width: 42, height: 42 }}
                >
                  <FaTwitter />
                </a>

                <a
                  className="flex gap-2 justify-center items-center p-2 border rounded-full w-full text-center block hover:bg-slate-100 active:bg-slate-200 text-black"
                  href="mailto:join@getmash.com"
                  target="_blank"
                  style={{ width: 42, height: 42 }}
                >
                  <FaEnvelope />
                </a>

                <a
                  className="flex gap-2 justify-center items-center p-2 border rounded-full w-full text-center block hover:bg-slate-100 active:bg-slate-200 text-black"
                  href="https://www.linkedin.com/company/getmash"
                  target="_blank"
                  style={{ width: 42, height: 42 }}
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
            <div className="grid-right-col px-0 sm:px-8">
              <div className="desc mb-8">
                <h3 className="mt-0">Description</h3>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged.
                </p>
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
                          <Link
                            key={section.link}
                            to={section.link}
                            className="block hover:bg-slate-100 active:bg-slate-200 text-black"
                          >
                            <li className="section py-4 px-8 mb-0">
                              {chapter.number}.{section.number} {section.title}
                            </li>
                          </Link>
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
