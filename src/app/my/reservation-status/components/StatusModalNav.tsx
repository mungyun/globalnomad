import React, { useState } from "react";

const valueStyle = "text-[20px] cursor-pointer";

const StatusModalNav = () => {
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
      <div>{value}</div>
    </div>
  );
};

export default StatusModalNav;
