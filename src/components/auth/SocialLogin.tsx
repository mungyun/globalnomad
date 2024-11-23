import Image from "next/image";
import Link from "next/link";

const SocialLogin = () => {
  return (
    <div className="relative mt-7 w-full border-t border-gray03 md:mt-10">
      <p className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-[23.5px] text-gray08 md:-top-4 md:px-[37.5px] md:text-xl md:leading-8">
        SNS 계정으로 로그인하기
      </p>
      <div className="mx-auto flex w-fit gap-4 pt-9 md:pt-14">
        {/* 구글 로그인 */}
        <Link href="https://www.google.co.kr/" className="inline-flex">
          <button className="relative size-12 rounded-full md:size-[72px]">
            <Image src="/icons/google.svg" alt="구글 간편 로그인" fill />
          </button>
        </Link>
        {/* 카카오톡 로그인 */}
        <Link href="https://www.kakaocorp.com/page/service/service/KakaoTalk" className="inline-flex">
          <button className="relative size-12 rounded-full md:size-[72px]">
            <Image src="/icons/kakao.svg" alt="카카오톡 간편 로그인" fill />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SocialLogin;
