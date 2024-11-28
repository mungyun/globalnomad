"use client";

import Button from "@/components/Button";
import DropdownInput from "@/components/dropdown/DropdownInput";
import LabelInput from "@/components/input/LabelInput";
import Textarea from "@/components/input/Textarea";
import { useForm } from "react-hook-form";
import BannerImageForm from "../../create/components/BannerImageForm";
import ScheduleList from "../../create/components/ScheduleList";
import SubImageForm from "../../create/components/SubImageForm";

const UpdateActivityForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm({ defaultValues: mock });

  const onSubmit = () => {
    console.log();
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex justify-between">
        <h2 className="text-[32px] font-bold leading-[42px]">내 체험 수정</h2>
        <Button type="submit" disabled={!isValid} size="md" onClick={handleSubmit(onSubmit)}>
          수정하기
        </Button>
      </div>
      <LabelInput placeholder="제목" {...register("title")} />
      <DropdownInput setValue={(value) => setValue("category", value)} {...register("category")} />
      <Textarea placeholder="설명" {...register("description")} />
      <LabelInput label="가격" placeholder="가격" type="number" {...register("price")} />
      <LabelInput label="주소" placeholder="주소를 입력해주세요" {...register("address")} />
      <ScheduleList watch={watch} setValue={setValue} />
      <BannerImageForm register={register} watch={watch} setValue={setValue} />
      <SubImageForm register={register} watch={watch} setValue={setValue} />
    </div>
  );
};

export default UpdateActivityForm;

// 임시 데이터
const mock = {
  id: 7,
  userId: 21,
  title: "함께 배우면 즐거운 스트릿댄스",
  description: "둠칫 둠칫 두둠칫",
  category: "투어",
  price: 10000,
  address: "서울특별시 강남구 테헤란로 427",
  bannerImageUrl:
    "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png",
  subImages: [
    {
      id: 1,
      imageUrl:
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/b.png",
    },
  ],
  schedules: [
    {
      id: 1,
      date: "2023-12-01",
      startTime: "12:00",
      endTime: "13:00",
    },
    {
      id: 2,
      date: "2023-12-05",
      startTime: "12:00",
      endTime: "13:00",
    },
  ],
  reviewCount: 5,
  rating: 4.74,
  createdAt: "2023-12-31T21:28:50.589Z",
  updatedAt: "2023-12-31T21:28:50.589Z",
};
