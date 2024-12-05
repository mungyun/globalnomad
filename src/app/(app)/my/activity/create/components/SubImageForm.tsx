import ImageInput from "@/components/input/ImageInput";
import { ActiviteForm } from "@/types/ActivityType";
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import PrevImage from "./PrevImage";

interface FormProps {
  register: UseFormRegister<ActiviteForm>;
  watch: UseFormWatch<ActiviteForm>;
  setValue: UseFormSetValue<ActiviteForm>;
}

const SubImageForm = ({ register, watch, setValue }: FormProps) => {
  const watchImages = watch("subImageFiles", []) as File[];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setValue("subImageFiles", [...watchImages, ...newFiles]);
    }
  };

  const clearImage = (index: number) => {
    const newFiles = watchImages.filter((_, i) => i !== index);
    setValue("subImageFiles", newFiles);
  };

  return (
    <>
      <label className="text-xl font-bold leading-8 text-black03 md:text-2xl">소개 이미지</label>
      <div className="grid grid-cols-2 gap-2 md:gap-4 xl:grid-cols-4 xl:gap-6">
        <ImageInput register={register} name="subImageFiles" multiple onChange={handleFileChange} />
        {watchImages.length > 0 &&
          watchImages.map((image, index) => (
            <PrevImage key={index} imageFile={image} clearImage={() => clearImage(index)} />
          ))}
      </div>
      <p className="pl-2 text-lg text-gray09">*이미지를 최소 4개 이상 제출해주세요.</p>
    </>
  );
};

export default SubImageForm;
