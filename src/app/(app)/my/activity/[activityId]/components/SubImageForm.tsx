import ImageInput from "@/components/input/ImageInput";
import useUploadImage from "@/hooks/useUploadImage";
import { ActivityForm } from "@/types/ActivityType";
import { useRef } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import PrevImage from "../../create/components/PrevImage";

interface FormProps {
  watch: UseFormWatch<ActivityForm>;
  setValue: UseFormSetValue<ActivityForm>;
}

const SubImageForm = ({ watch, setValue }: FormProps) => {
  const watchImages = watch("subImageUrls", []) as string[];
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const mutation = useUploadImage();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const imageUrls: string[] = [];

    for (const file of files) {
      const imageUrl = await mutation.mutateAsync(file);
      imageUrls.push(imageUrl);
    }

    setValue("subImageUrls", [...watchImages, ...imageUrls], { shouldValidate: true });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const clearImage = (index: number) => {
    const newImage = watchImages.filter((_, i) => i !== index);
    setValue("subImageUrls", newImage);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <label className="text-xl font-bold leading-8 text-black03 md:text-2xl">소개 이미지</label>
      <div className="grid grid-cols-2 gap-2 md:gap-4 xl:grid-cols-4 xl:gap-6">
        <ImageInput multiple onChange={handleFileChange} ref={fileInputRef} />
        {watchImages &&
          watchImages.map((image, index) => (
            <PrevImage key={index} imageFile={image} clearImage={() => clearImage(index)} />
          ))}
      </div>
      <p className="pl-2 text-lg text-gray09">*소개 이미지를 4개 입력해 주세요.</p>
    </>
  );
};

export default SubImageForm;
