import { Link } from "gatsby";
import * as React from "react";
import { FaListUl } from "react-icons/fa";
import useTableOfContents from "../queries/useTableOfContents";

type PageLinkProps = {
  className?: string;
  to: string;
  active?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

const PageLink = (props: React.PropsWithChildren<PageLinkProps>) => {
  const { active, className, children, to, onClick } = props;
  return (
    <Link
      className={`block text-black text-lg font-bold hover:bg-slate-100 active:bg-slate-200 ${
        active ? "bg-slate-100" : ""
      } ${className || ""}`}
      to={to}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

type QuickNavProps = {
  currentHref: string;
};

export default function QuickNav(props: QuickNavProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const toc = useTableOfContents();

  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const outside = evt => {
      if (!ref.current) return;

      const inside = ref.current.contains(evt.target);
      if (inside) return;
      setShow(false);
    };
    window.addEventListener("click", outside);
    return () => {
      window.removeEventListener("click", outside);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        className="border rounded-full p-2 hover:bg-slate-100 active:bg-slate-200"
        onClick={() => {
          setShow(!show);
        }}
      >
        <FaListUl size={12} />
      </button>
      {show && (
        <div className="absolute top-10 right-0 border rounded-lg min-w-dropdown max-h-8/10vh overflow-auto z-50">
          <div className="bg-white">
            <ul className="border divide-y m-0 list-none">
              <PageLink to="/">
                <li className="p-4 m-0">Home </li>
              </PageLink>

              {toc.chapters.map(chapter => (
                <React.Fragment key={chapter.title}>
                  <PageLink
                    key={chapter.title}
                    active={props.currentHref === chapter.link}
                    to={chapter.link || chapter.sections[0].link}
                    onClick={() => setShow(false)}
                  >
                    <li className="p-4 pt-6 m-0">
                      {chapter.sections.length === 0 ? "" : `Chapter ${chapter.number}:`} {chapter.title}
                    </li>
                  </PageLink>
                  {chapter.sections.length > 1 &&
                    chapter.sections.map(section => (
                      <li className="m-0 p-0" key={section.link}>
                        <PageLink
                          active={props.currentHref === section.link}
                          key={section.link}
                          to={section.link}
                          onClick={() => setShow(false)}
                          className="text-sm font-normal p-4 m-0"
                        >
                          {chapter.number}.{section.number} {section.title}
                        </PageLink>
                      </li>
                    ))}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
