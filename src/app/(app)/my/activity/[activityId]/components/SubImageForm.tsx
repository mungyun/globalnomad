import ImageInput from "@/components/input/ImageInput";
import useUploadImage from "@/hooks/useUploadImage";
import { ActivityForm, SubImage } from "@/types/ActivityType";
import { useRef } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import PrevImage from "../../create/components/PrevImage";

interface FormProps {
  watch: UseFormWatch<ActivityForm>;
  setValue: UseFormSetValue<ActivityForm>;
}

const SubImageForm = ({ watch, setValue }: FormProps) => {
  const subImages = watch("subImages") as SubImage[];
  const subImageUrls = watch("subImageUrlsToAdd", []) as string[];
  const toRemove = watch("subImageIdsToRemove", []) as number[];
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
    setValue("subImageUrlsToAdd", [...imageUrls, ...subImageUrls], { shouldValidate: true });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const clearImage = (image: string | SubImage) => {
    if (typeof image === "string") {
      // 새로 추가한 이미지 삭제
      const updateSubImage = subImageUrls.filter((item) => item !== image);
      setValue("subImageUrlsToAdd", updateSubImage);
    } else {
      // 기존 이미지 삭제
      setValue("subImageIdsToRemove", [...toRemove, image.id]);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <label className="text-xl font-bold leading-8 text-black03 md:text-2xl">소개 이미지</label>
      <div className="grid grid-cols-2 gap-2 md:gap-4 xl:grid-cols-4 xl:gap-6">
        <ImageInput multiple onChange={handleFileChange} ref={fileInputRef} />
        {subImageUrls && // 새로 추가한 이미지
          subImageUrls.map((image, index) => (
            <PrevImage key={index} imageFile={image} clearImage={() => clearImage(image)} />
          ))}
        {subImages && // 기존 이미지
          subImages
            .filter((image) => !toRemove.includes(image.id)) // 기존 이미지에서 삭제할 이미지 제외하고 렌더링
            .map((image) => (
              <PrevImage key={image.id} imageFile={image.imageUrl} clearImage={() => clearImage(image)} />
            ))}
      </div>
      <p className="pl-2 text-lg text-gray09">*소개 이미지를 4개 입력해 주세요.</p>
    </>
  );
};

export default SubImageForm;
