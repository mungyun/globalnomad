import React, { ReactNode } from "react";

const ActivityDetailLayout = ({ children }: { children: ReactNode }) => {
  return <div className="mx-auto w-full max-w-[375px] md:max-w-[700px] xl:max-w-[1200px]">{children}</div>;
};

export default ActivityDetailLayout;
