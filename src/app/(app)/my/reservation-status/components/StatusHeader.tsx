import StatusHeaderDropdown from "./StatusHeaderDropdown";

const StatusHeader = () => {
  return (
    <div className="mb-[30px]">
      <h2 className="mb-6 text-[32px] font-bold md:mb-8">예약현황</h2>
      <StatusHeaderDropdown />
    </div>
  );
};

export default StatusHeader;
