"use client";

import Button from "@/components/Button";
import DropdownInput from "@/components/dropdown/DropdownInput";
import LabelInput from "@/components/input/LabelInput";
import PostInput from "@/components/input/PostInput";
import Textarea from "@/components/input/Textarea";
import { useToast } from "@/components/toast/ToastProvider";
import { getActivityDetail } from "@/lib/api/Activities";
import { PatchActivities } from "@/lib/api/MyActivities";
import { ActivityDetail, PatchActivityType } from "@/types/ActivityType";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import BannerImageForm from "../../create/components/BannerImageForm";
import ScheduleList from "./ScheduleList";
import SubImageForm from "./SubImageForm";

interface formProps {
  id: number;
}

const UpdateActivityForm = ({ id }: formProps) => {
  const router = useRouter();
  const Toast = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isValid },
  } = useForm<PatchActivityType>({
    defaultValues: { title: "", category: "", description: "", price: 0, address: "", schedules: [], subImages: [] },
  });

  const {
    data: activityDetailData,
    isPending,
    isError,
    error,
  } = useQuery<ActivityDetail, Error>({
    queryKey: ["activityDetailData", id],
    queryFn: () => getActivityDetail(id),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (data: PatchActivityType) => {
      return PatchActivities(id, data);
    },
    onSuccess: () => {
      router.push("/my/activity");
      Toast.success("체험 수정에 성공했습니다.");
    },
    onError: (error) => {
      Toast.error(error.message || "체험 수정에 실패했습니다.");
    },
  });

  const onSubmit = async (data: PatchActivityType) => {
    console.log(data);
    if (data.subImageUrlsToAdd?.length !== data.subImageIdsToRemove?.length) {
      Toast.error("소개 이미지를 4개 입력해 주세요");
      return;
    }
    mutation.mutate(data);
  };

  useEffect(() => {
    if (isPending) return;
    if (isError) {
      Toast.error(error.message);
    }
    reset(activityDetailData);
  }, [reset, isPending, activityDetailData]);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex justify-between">
        <h2 className="text-[32px] font-bold leading-[42px]">내 체험 수정</h2>
        <Button
          type="submit"
          disabled={!isValid || mutation.isPending}
          isLoading={mutation.isPending}
          size="md"
          onClick={handleSubmit(onSubmit)}
        >
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
      <SubImageForm watch={watch} setValue={setValue} />
    </div>
  );
};

export default UpdateActivityForm;
