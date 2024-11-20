import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "full" | "lg" | "md" | "sm"; // 사이즈 지정
  color?: "green" | "white"; // 색상 지정
  additionalClass?: string; // 추가 class 속성
}

const baseClass =
  "flex items-center justify-center rounded-md disabled:border-none disabled:bg-gray06 disabled:text-white";

const sizeClass = {
  full: "h-[48px] w-full text-base font-bold leading-[26px]",
  lg: "h-[48px] w-[350px] text-base font-bold leading-[26px]",
  md: "h-[48px] w-[144px] text-base font-bold leading-[26px]",
  sm: "h-[38px] w-[108px] text-sm font-bold leading-[24px]",
};

const colorClass = {
  green: "bg-green02 text-white",
  white: "border-[1px] border-green02 bg-white text-green02 ",
};

const Button = ({ children, size = "full", color = "green", additionalClass, ...props }: ButtonProps) => {
  return (
    <button
      className={`${baseClass} ${sizeClass[size]} ${colorClass[color]} ${additionalClass} disabled:cursor-not-allowed`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
