import React from "react";

import { NoData } from "neetoui";

const PageNotFound = () => (
  <div className="absolute left-1/3 top-1/3">
    <NoData
      title="The page you are looking for can't be found"
      primaryButtonProps={{
        label: "Back to Home",
        className: "bg-neutral-800 hover:bg-neutral-950",
        to: "/",
      }}
    />
  </div>
);

export default PageNotFound;
