import ImageInput from "@/components/input/ImageInput";
import { PostActivities } from "@/types/ActiviteyType";
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import PrevImage from "./PrevImage";

interface FormProps {
  register: UseFormRegister<PostActivities>;
  watch: UseFormWatch<PostActivities>;
  setValue: UseFormSetValue<PostActivities>;
}

const BannerImageForm = ({ register, watch, setValue }: FormProps) => {
  const watchImage = watch("bannerImageFile");
  const imageFile = (watchImage as FileList | undefined)?.[0];

  // 이미지 입력 취소 함수
  const clearImage = () => {
    setValue("bannerImageFile", undefined);
  };

  return (
    <>
      <label className="text-xl font-bold leading-8 text-black03 md:text-2xl">배너 이미지</label>
      <div className="grid grid-cols-2 grid-rows-1 gap-2 md:gap-4 xl:grid-cols-4 xl:gap-6">
        <ImageInput register={register} name="bannerImageFile" />
        {imageFile && <PrevImage imageFile={imageFile} clearImage={clearImage} />}
      </div>
    </>
  );
};

export default BannerImageForm;
