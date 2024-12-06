import { InputHTMLAttributes, forwardRef } from "react";
import { FiPlus } from "react-icons/fi";

const ImageInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ ...props }, ref) => {
  return (
    <label className="flex aspect-square flex-col items-center justify-center gap-7 rounded-xl border border-dashed border-gray09 xl:size-[182px]">
      <FiPlus className="size-12" />
      이미지 등록
      <input className="hidden" type="file" accept="image/*" ref={ref} {...props} />
    </label>
  );
});

ImageInput.displayName = "ImageInput";

export default ImageInput;
