import SignupForm from "@/app/components/auth/SignupForm";
import SocialSignup from "@/app/components/auth/SocialSignup";
import Link from "next/link";

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

      <SocialSignup />
    </>
  );
};

export default SignupPage;
