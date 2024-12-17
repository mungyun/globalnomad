import Image from "next/image";
import { InputHTMLAttributes, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelStyle?: "small" | "large";
  errors?: string;
}

const LABEL_STYLES = {
  small: "text-base font-normal",
  large: "text-lg font-bold gap-5 mt-5",
} as const;

const AuthInput = ({ label, labelStyle = "small", errors, ...props }: InputProps) => {
  const [inputType, setInputType] = useState(props.type || "text");

  const togglePasswordVisibility = () => {
    setInputType((prev) => (prev === "password" ? "text" : "password"));
  };

  const errorClass = "border-red03";
  return (
    <label className={`flex flex-col gap-2 leading-[26px] text-black03 ${LABEL_STYLES[labelStyle]}`}>
      {label}
      <div className="relative">
        <input
          className={`h-[58px] w-full rounded-md border border-gray08 px-5 py-4 text-base leading-[26px] outline-green02 placeholder:text-gray06 ${errors && errorClass}`}
          autoComplete={props.type}
          {...props}
          type={inputType}
        />
        {props.type === "password" && (
          <Image
            className="absolute bottom-[17px] right-5 cursor-pointer"
            src={inputType === "password" ? "/icons/btn_visibility_off.svg" : "/icons/btn_visibility_on.svg"}
            alt="icon"
            width={24}
            height={24}
            onClick={togglePasswordVisibility}
            priority
          />
        )}
      </div>
      {errors && <span className="pl-2 text-xs leading-[18px] text-red03">{errors}</span>}
    </label>
  );
};

export default AuthInput;
