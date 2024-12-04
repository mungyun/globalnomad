import { ButtonHTMLAttributes, ReactNode } from "react";

interface CategoryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  active?: boolean;
}
const CategoryButton = ({ children, active = false, ...props }: CategoryButtonProps) => {
  return (
    <button
      {...props}
      className={`flex h-[41px] w-20 shrink-0 items-center justify-center rounded-[15px] border border-green02 text-base font-medium leading-[26px] md:h-[58px] md:w-[120px] md:text-lg xl:w-[127px] ${active ? "bg-green02 text-white" : "bg-background text-green02"}`}
    >
      {children}
    </button>
  );
};

export default CategoryButton;
