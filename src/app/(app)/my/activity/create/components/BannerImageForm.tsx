import ImageInput from "@/components/input/ImageInput";
import useUploadImage from "@/hooks/useUploadImage";
import { ActiviteForm } from "@/types/ActivityType";
import { useRef } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import PrevImage from "./PrevImage";

interface FormProps {
  watch: UseFormWatch<ActiviteForm>;
  setValue: UseFormSetValue<ActiviteForm>;
}

const BannerImageForm = ({ watch, setValue }: FormProps) => {
  const watchImage = watch("bannerImageUrl");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const mutation = useUploadImage();

  const imageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const data = await mutation.mutateAsync(file);
    setValue("bannerImageUrl", data, { shouldValidate: true });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const clearImage = () => {
    setValue("bannerImageUrl", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <label className="text-xl font-bold leading-8 text-black03 md:text-2xl">배너 이미지</label>
      <div className="grid grid-cols-2 grid-rows-1 gap-2 md:gap-4 xl:grid-cols-4 xl:gap-6">
        <ImageInput onChange={imageUpload} ref={fileInputRef} />
        {watchImage && <PrevImage imageFile={watchImage} clearImage={clearImage} />}
      </div>
    </>
  );
};

export default BannerImageForm;
