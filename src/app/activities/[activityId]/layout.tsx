import React, { ReactNode } from "react";

const ActivityDetailLayout = ({ children }: { children: ReactNode }) => {
  return <div className="mx-auto w-full px-6 md:max-w-[1200px] md:px-0">{children}</div>;
};

export default ActivityDetailLayout;
