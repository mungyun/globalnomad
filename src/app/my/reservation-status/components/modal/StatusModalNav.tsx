import React, { useState } from "react";
import ApplicationMode from "./ApplicationMode";
import ApprovalMode from "./ApprovalMode";
import RefusalMode from "./RefusalMode";

const valueStyle = "text-[20px] cursor-pointer";

const StatusModalNav = ({ date }: { date?: string }) => {
  const [value, setValue] = useState<string>("신청");

  return (
    <div>
      <ul className="flex gap-3 border-b border-b-gray03 pb-[10px]">
        {["신청", "승인", "거절"].map((item) => (
          <li
            key={item}
            className={`${valueStyle} ${value === item ? "text font-semibold text-green02" : "text-gray09"}`}
            onClick={() => setValue(item)}
          >
            {item}
          </li>
        ))}
      </ul>
      <div>
        {value === "신청" ? (
          <ApplicationMode date={date || ""} />
        ) : value === "승인" ? (
          <ApprovalMode />
        ) : (
          <RefusalMode />
        )}
      </div>
    </div>
  );
};

export default StatusModalNav;
