import React, { ReactNode } from "react";

const ActivityDetailLayout = ({ children }: { children: ReactNode }) => {
  return <div className="mx-auto w-full md:max-w-[1200px] md:px-6 xl:px-0">{children}</div>;
};

export default ActivityDetailLayout;
