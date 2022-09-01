import * as React from "react";
import { isMobile } from "react-device-detect";
import { Link } from "gatsby";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type PageNavigationProps = {
  direction: "next" | "prev";
  to: string;
};

export default function PageNavigation(props: PageNavigationProps) {
  const [width, setWidth] = React.useState(window.innerWidth);

  const Icon = props.direction === "prev" ? FaChevronLeft : FaChevronRight;

  const classes = [
    "fixed",
    "p-6",
    "bottom-4",
    "translate-1/2",
    "bg-black",
    "hover:bg-slate-700",
    "active:bg-slate-400",
    "text-white",
    "rounded-full",
    "shadow-lg",
    "z-40",
  ];

  if (props.direction === "prev") {
    classes.push("left-1/3");
  } else {
    classes.push("right-1/3");
  }

  if (width < 600 || isMobile) {
    classes.push("p-4");
  }

  React.useEffect(() => {
    const resize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <Link className={classes.join(" ")} to={props.to}>
      <Icon />
    </Link>
  );
}
