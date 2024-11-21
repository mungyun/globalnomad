import React, { ReactNode } from "react";

const ActivityDetailLayout = ({ children }: { children: ReactNode }) => {
  return <div className="mx-auto w-full md:max-w-[700px] xl:max-w-[1200px]">{children}</div>;
};

export default ActivityDetailLayout;
