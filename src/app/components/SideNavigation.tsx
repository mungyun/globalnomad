import Image from "next/image";
import Link from "next/link";
import { IoPersonCircleOutline } from "react-icons/io5";

interface ListProps {
  img: string;
  text: string;
}

const List: React.FC<ListProps> = ({ img, text }) => (
  <div className="group flex cursor-pointer gap-5 rounded-xl px-5 py-2 font-bold hover:bg-gray10 hover:text-black">
    <Image src={`/icons/${img}.svg`} width="24" height="24" alt="icon" className="group-hover:brightness-0" />
    {text}
  </div>
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
        <Link href="mypage">
          <List img={"mypage"} text={"내 정보"} />
        </Link>
        <Link href="reservation">
          <List img={"reservation"} text={"예약 정보"} />
        </Link>
        <Link href="myactivity">
          <List img={"myactivity"} text={"내 체험 관리"} />
        </Link>
        <Link href="calender">
          <List img={"calender"} text={"예약 현황"} />
        </Link>
      </div>
    </div>
  );
}
