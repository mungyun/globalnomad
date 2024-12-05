import { ActiviteForm } from "@/types/ActivityType";
import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";
import { FiPlus } from "react-icons/fi";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<ActiviteForm>;
  name: "bannerImageFile" | "subImageFiles";
}

const ImageInput = ({ register, name, ...props }: InputProps) => {
  return (
    <label className="flex aspect-square flex-col items-center justify-center gap-7 rounded-xl border border-dashed border-gray09 xl:size-[182px]">
      <FiPlus className="size-12" />
      이미지 등록
      <input className="hidden" type="file" {...register(name)} accept="image/*" {...props} />
    </label>
  );
};

export default ImageInput;
