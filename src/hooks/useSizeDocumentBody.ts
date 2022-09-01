import { useEffect } from "react";

export function useSizeDocumentBody() {
  useEffect(() => {
    const size = () => {
      window.document.body.style.height = `${window.innerHeight}px`;
    };
    size();
    window.addEventListener("resize", size);
    return () => {
      window.removeEventListener("resize", size);
    };
  }, []);
}
