"use client";

import Button from "@/components/Button";
import DropdownInput from "@/components/dropdown/DropdownInput";
import LabelInput from "@/components/input/LabelInput";
import PostInput from "@/components/input/PostInput";
import Textarea from "@/components/input/Textarea";
import { getActivityDetail } from "@/lib/api/Activities";
import { ActivityDetail, PatchActivityType } from "@/types/ActivityType";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import BannerImageForm from "../../create/components/BannerImageForm";
import ScheduleList from "../../create/components/ScheduleList";
import SubImageForm from "../../create/components/SubImageForm";

interface formProps {
  id: number;
}

const UpdateActivityForm = ({ id }: formProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isValid },
  } = useForm<PatchActivityType>();
  const {
    data: activityDetailData,
    isPending,
    isError,
  } = useQuery<ActivityDetail, Error>({
    queryKey: ["activityDetailData", id],
    queryFn: () => getActivityDetail(id),
    enabled: !!id,
    staleTime: 60 * 5 * 1000, // 5분에 한 번씩 데이터 교체
  });

  const onSubmit = (data: PatchActivityType) => {
    console.log(data);
  };

  useEffect(() => {
    if (isPending) return;
    const data = activityDetailData;
    const filteredData: PatchActivityType = {
      title: data.title,
      category: data.category,
      description: data.description,
      price: data.price,
      address: data.address,
      bannerImageUrl: data.bannerImageUrl,
      subImageUrls: [],
      schedules: data.schedules.map((schedule) => ({
        id: schedule.id,
        date: schedule.date,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
      })),
    };
    reset(filteredData);
  }, [reset, isPending]);

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
      <PostInput label={"주소"} watch={watch} setValue={setValue} placeholder="주소를 입력해주세요" />
      <ScheduleList watch={watch} setValue={setValue} />
      <BannerImageForm watch={watch} setValue={setValue} />
      {/* <SubImageForm watch={watch} setValue={setValue} /> */}
    </div>
  );
};

export default UpdateActivityForm;
