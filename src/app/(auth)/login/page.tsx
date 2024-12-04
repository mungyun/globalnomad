import LoginForm from "@/app/(auth)/components/LoginForm";
import SocialLogin from "@/app/(auth)/components/SocialLogin";
import Link from "next/link";

const LoginPage = () => {
  return (
    <>
      <LoginForm />

      <p className="text-base leading-[19.09px] text-gray09">
        회원이 아니신가요?{" "}
        <Link href="/signup" className="text-green02 underline">
          회원가입하기
        </Link>
      </p>

      <SocialLogin />
    </>
  );
};

export default LoginPage;
