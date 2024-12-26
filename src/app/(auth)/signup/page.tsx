import SignupForm from "@/app/(auth)/components/SignupForm";
import Link from "next/link";
import { Suspense } from "react";
import SocialLogin from "../components/SocialLogin";

const SignupPage = () => {
  return (
    <>
      <SignupForm />
      <p className="text-base leading-[19.09px] text-gray09">
        회원이신가요?{" "}
        <Link href="/login" className="text-green02 underline">
          로그인하기
        </Link>
      </p>
      <Suspense>
        <SocialLogin />
      </Suspense>
    </>
  );
};

export default SignupPage;
