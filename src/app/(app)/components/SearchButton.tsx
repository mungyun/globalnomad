import { ButtonHTMLAttributes, ReactNode } from "react";

interface SearchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
const SearchButton = ({ children, ...props }: SearchButtonProps) => {
  return (
    <button
      {...props}
      className="flex h-14 w-24 shrink-0 items-center justify-center rounded-[4px] bg-black02 text-base text-white md:w-[136px]"
    >
      {children}
    </button>
  );
};

export default SearchButton;
