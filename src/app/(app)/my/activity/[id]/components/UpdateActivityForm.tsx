"use client";

import Button from "@/components/Button";
import DropdownInput from "@/components/dropdown/DropdownInput";
import LabelInput from "@/components/input/LabelInput";
import Textarea from "@/components/input/Textarea";
import { PatchActivites } from "@/types/ActiviteyType";
import { useEffect } from "react";
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
    reset,
    formState: { isValid },
  } = useForm<PatchActivites>();

  const onSubmit = (data: PatchActivites) => {
    console.log(data);
  };

  useEffect(() => {
    const data = mock;
    const filteredData: PatchActivites = {
      title: data.title,
      category: data.category,
      description: data.description,
      price: data.price,
      address: data.address,
      bannerImageUrl: data.bannerImageUrl,
      subImageUrlsToAdd: [],
      schedules: data.schedules.map((schedule) => ({
        id: schedule.id,
        date: schedule.date,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
      })),
    };
    reset(filteredData);
  }, [reset]);

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
  id: 3232,
  userId: 1306,
  title: "test",
  description: "테스트 중입니다.",
  category: "문화 · 예술",
  price: 99999,
  address: "test",
  bannerImageUrl:
    "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/9-1_1306_1732862127384.webp",
  rating: 0,
  reviewCount: 0,
  createdAt: "2024-11-29T15:31:02.763Z",
  updatedAt: "2024-11-29T15:40:50.215Z",
  subImages: [
    {
      id: 4963,
      imageUrl:
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/9-1_1306_1732862127384.webp",
    },
  ],
  schedules: [
    {
      id: 12273,
      date: "2023-12-01",
      startTime: "12:00",
      endTime: "13:00",
    },
    {
      id: 12274,
      date: "2023-12-05",
      startTime: "12:00",
      endTime: "13:00",
    },
    {
      id: 12275,
      date: "2023-12-05",
      startTime: "13:00",
      endTime: "14:00",
    },
    {
      id: 12276,
      date: "2023-12-05",
      startTime: "14:00",
      endTime: "15:00",
    },
    {
      id: 12277,
      date: "2999-12-05",
      startTime: "12:00",
      endTime: "13:00",
    },
  ],
};
