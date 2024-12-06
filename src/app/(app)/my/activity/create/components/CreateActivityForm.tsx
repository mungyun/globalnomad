"use client";

import Button from "@/components/Button";
import DropdownInput from "@/components/dropdown/DropdownInput";
import LabelInput from "@/components/input/LabelInput";
import Textarea from "@/components/input/Textarea";
import { useToast } from "@/components/toast/ToastProvider";
import { PostActivities } from "@/lib/api/Activities";
import { PostActivityType } from "@/types/ActivityType";
import { PostActivitySchema } from "@/zodSchema/activitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import BannerImgForm from "./BannerImageForm";
import ScheduleList from "./ScheduleList";
import SubImageForm from "./SubImageForm";

const CreateActivityForm = () => {
  const router = useRouter();
  const Toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<PostActivityType>({
    resolver: zodResolver(PostActivitySchema),
    mode: "onBlur",
  });

  const mutation = useMutation({
    mutationFn: (data: PostActivityType) => {
      return PostActivities(data);
    },
    onSuccess: () => {
      Toast.success("체험 등록에 성공했습니다.");
      router.push("/my/activity");
    },
    onError: (error) => {
      Toast.error(error.message || "체험 등록에 실패했습니다.");
    },
  });

  const onSubmit = async (data: PostActivityType) => {
    console.log(data);
    data.price = Number(data.price);
    if (!data.subImageUrls || data.subImageUrls.length < 4) return;
    mutation.mutate(data);
    // try {
    //   await PostActivities(data);
    //   router.push("/my/activity");
    // } catch (error) {
    //   if (error instanceof Error) {
    //     // toast로 바꿀 예정
    //     alert(`${error.message}`);
    //   }
    // }
  };
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex justify-between">
        <h2 className="text-[32px] font-bold leading-[42px]">내 체험 등록</h2>
        <Button type="submit" disabled={!isValid || mutation.isPending} size="md" onClick={handleSubmit(onSubmit)}>
          {mutation.isPending ? "등록중" : "등록하기"}
        </Button>
      </div>
      <LabelInput placeholder="제목" {...register("title")} />
      <DropdownInput setValue={(value) => setValue("category", value)} {...register("category")} />
      <Textarea placeholder="설명" {...register("description")} />
      <LabelInput label="가격" placeholder="가격" {...register("price", { valueAsNumber: true })} type="number" />
      <LabelInput label="주소" placeholder="주소를 입력해주세요" {...register("address")} />
      <ScheduleList watch={watch} setValue={setValue} />
      <BannerImgForm watch={watch} setValue={setValue} />
      <SubImageForm watch={watch} setValue={setValue} />
    </div>
  );
};

export default CreateActivityForm;
