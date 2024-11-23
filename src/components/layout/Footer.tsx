import Image from "next/image";

const Footer = () => {
  return (
    <div className="relative h-40 w-full bg-black02 px-[38px] pt-8 font-arial text-[#676767] md:px-[111px]">
      <div className="mx-auto flex max-w-[1200px] flex-wrap justify-center gap-3 overflow-hidden sm:justify-around lg:justify-between">
        <span className="whitespace-nowrap pb-3">©codeit - 2023</span>
        <div>
          <span className="whitespace-nowrap">Privacy Policy</span>
          <span className="pl-[30px] pr-[18.11px]">FAQ</span>
        </div>
        <div className="flex h-5 w-fit gap-3">
          <Image src="/icons/facebook.svg" alt="페이스북 아이콘" height={20} width={20} />
          <Image src="/icons/twitter.svg" alt="트위터 아이콘" height={20} width={20} />
          <Image src="/icons/youtube.svg" alt="유튜브 아이콘" height={20} width={20} />
          <Image src="/icons/instagram.svg" alt="인스타그램 아이콘" height={20} width={20} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
