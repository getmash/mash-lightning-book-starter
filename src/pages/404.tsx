import * as React from "react";
import { navigate } from "gatsby";
import LoadingSpinner from "../components/LoadingSpinner";

function NotFoundPage() {
  React.useEffect(() => {
    navigate("/");
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-12 h-full flex flex-col">
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner height={42} width={42} />
      </div>
    </div>
  );
}

export default NotFoundPage;
