import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mx-auto flex flex-col items-center justify-center gap-10 px-3 pb-14 pt-10 md:gap-12 md:px-[52px] md:pb-[236px] md:pt-12 xl:pb-[183px]">
      <div className="flex w-full flex-col items-center justify-center gap-6 md:gap-8">
        {/* 로고 이미지 */}
        <div className="relative h-[154px] w-[270px] md:mb-6 md:h-[192px] md:w-[340px]">
          <Image src="/icons/logo_big.svg" fill alt="로고 이미지" />
        </div>

        {/* 인풋 필드 */}
        <form className="flex w-full max-w-[640px] flex-col gap-7">
          <div className="flex flex-col gap-2">
            <label>이메일</label>
            <input
              type="email"
              placeholder="이메일을 입력해 주세요"
              className="h-[58px] rounded-md border-[1px] border-gray08 px-4 py-5"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>비밀번호</label>
            <input
              type="email"
              placeholder="비밀번호를 입력해 주세요"
              className="h-[58px] rounded-md border-[1px] border-gray08 px-4 py-5"
            />
          </div>
          <Button disabled>로그인 하기</Button>
        </form>

        {/* 회원가입 링크 */}
        <p className="text-base leading-[19.09px] text-gray09">
          회원이 아니신가요?{" "}
          <Link href="/signup" className="text-green02 underline">
            회원가입하기
          </Link>
        </p>
      </div>

      {/* 간편 로그인 */}
      <div className="flex w-full flex-col items-center gap-6 md:gap-10">
        <p className="">SNS 계정으로 로그인하기</p>
        <div className="flex gap-4">
          <Link href="https://www.google.co.kr/">
            <button className="relative h-12 w-12 rounded-full">
              <Image src="/icons/google.svg" alt="구글 간편 로그인" fill />
            </button>
          </Link>
          <Link href="https://www.google.co.kr/">
            <button className="relative h-12 w-12 rounded-full">
              <Image src="/icons/kakao.svg" alt="카카오톡 간편 로그인" fill />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
