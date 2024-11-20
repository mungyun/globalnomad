import Image from "next/image";
import Link from "next/link";
import { IoPersonCircleOutline } from "react-icons/io5";

interface ListProps {
  iconName: string;
  text: string;
}

const List: React.FC<ListProps> = ({ iconName, text }) => (
  <Link href={`/${iconName}`}>
    <div className="group flex cursor-pointer gap-5 rounded-xl px-5 py-2 font-bold hover:bg-gray10 hover:text-black">
      <Image src={`/icons/${iconName}.svg`} width="24" height="24" alt="icon" className="group-hover:brightness-0" />
      {text}
    </div>
  </Link>
);

interface SideNavigationProps {
  onClick?: () => void;
}

export default function SideNavigation({ onClick }: SideNavigationProps) {
  return (
    <div className="flex h-[432px] w-[344px] flex-col gap-10 rounded-xl border border-gray03 bg-white p-6 md:w-[251px] xl:w-[384px]">
      <div className="flex h-[160px] w-full items-center justify-center">
        <IoPersonCircleOutline className="absolute w-full" size={200} color="grey" />
        <Image
          src="/icons/edit.svg"
          className="relative left-10 top-16 cursor-pointer"
          width="44"
          height="44"
          alt="editBtn"
          onClick={onClick}
        />
      </div>
      <div className="flex flex-col gap-3 bg-white text-base text-gray07">
        <List iconName={"mypage"} text={"내 정보"} />
        <List iconName={"reservation"} text={"예약 정보"} />
        <List iconName={"myactivity"} text={"내 체험 관리"} />
        <List iconName={"calender"} text={"예약 현황"} />
      </div>
    </div>
  );
}
