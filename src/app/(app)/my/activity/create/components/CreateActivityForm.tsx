"use client";

import Button from "@/components/Button";
import DropdownInput from "@/components/dropdown/DropdownInput";
import LabelInput from "@/components/input/LabelInput";
import Textarea from "@/components/input/Textarea";
import { PostActivities } from "@/types/ActiviteyType";
import { useForm } from "react-hook-form";
import BannerImgForm from "./BannerImageForm";
import ScheduleList from "./ScheduleList";
import SubImageForm from "./SubImageForm";

const CreateActivityForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<PostActivities>();

  const onSubmit = (data: PostActivities) => {
    console.log(data);
  };
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex justify-between">
        <h2 className="text-[32px] font-bold leading-[42px]">내 체험 등록</h2>
        <Button type="submit" disabled={!isValid} size="md" onClick={handleSubmit(onSubmit)}>
          등록하기
        </Button>
      </div>
      <LabelInput placeholder="제목" {...register("title")} />
      <DropdownInput setValue={(value) => setValue("category", value)} {...register("category")} />
      <Textarea placeholder="설명" {...register("description")} />
      <LabelInput label="가격" placeholder="가격" type="number" {...register("price")} />
      <LabelInput label="주소" placeholder="주소를 입력해주세요" {...register("address")} />
      <ScheduleList watch={watch} setValue={setValue} />
      <BannerImgForm register={register} watch={watch} setValue={setValue} />
      <SubImageForm register={register} watch={watch} setValue={setValue} />
    </div>
  );
};

export default CreateActivityForm;
