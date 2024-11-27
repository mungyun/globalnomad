import React from "react";

const titleStyle = "text-[20px] font-semibold text-[black03] mb-4";

const ApplicationMode = ({ date }: { date: string }) => {
  return (
    <div>
      <div className="mb-6 mt-[27px]">
        <h3 className={`${titleStyle}`}>예약 날짜</h3>
        <span>{date}</span>
      </div>
      <div>
        <h3 className={`${titleStyle}`}>예약 내역</h3>
      </div>
    </div>
  );
};

export default ApplicationMode;
