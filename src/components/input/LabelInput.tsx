import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string; // 라벨 text
}

const LabelInput = ({ label, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-4">
      {label && <label className="text-xl font-bold leading-8 text-black03 md:text-2xl">{label}</label>}
      <div className="relative">
        <input
          className="h-[56px] w-full rounded-s border-[1px] border-gray08 px-5 py-4 text-base leading-[26px] outline-green02 placeholder:text-gray06"
          {...props}
        />
      </div>
    </div>
  );
};

export default LabelInput;
