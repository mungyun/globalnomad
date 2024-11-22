import { mockData } from "./mockdata";

const SideBar = () => {
  const { price, schedules } = mockData;
  console.log("price:", price);
  console.log("schedules:", schedules);
  return <div className="xl rounded-xl border border-gray02 shadow-md xl:h-[746px] xl:w-[384px]"></div>;
};

export default SideBar;
