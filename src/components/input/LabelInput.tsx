import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string; // 라벨 text
}

const LabelInput = ({ label, ...props }: InputProps) => {
  return (
    <label className="flex flex-col gap-4 text-xl font-bold leading-8 text-black03 md:text-2xl">
      {label}
      <input
        className="h-[56px] w-full rounded border border-gray08 px-5 py-4 text-base font-normal leading-[26px] outline-green02 placeholder:text-gray06"
        autoComplete={props.type}
        {...props}
      />
    </label>
  );
};

export default LabelInput;
