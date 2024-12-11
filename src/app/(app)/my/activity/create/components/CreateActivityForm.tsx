"use client";

import Button from "@/components/Button";
import DropdownInput from "@/components/dropdown/DropdownInput";
import LabelInput from "@/components/input/LabelInput";
import PostInput from "@/components/input/PostInput";
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
    defaultValues: { title: "", category: "", description: "", price: 0, address: "", schedules: [] },
    resolver: zodResolver(PostActivitySchema),
    mode: "onBlur",
  });

  const mutation = useMutation({
    mutationFn: (data: PostActivityType) => {
      return PostActivities(data);
    },
    onSuccess: () => {
      router.push("/my/activity");
      Toast.success("체험 등록에 성공했습니다.");
    },
    onError: (error) => {
      Toast.error(error.message || "체험 등록에 실패했습니다.");
    },
  });

  const formatWithCommas = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const removeCommas = (value: string) => {
    return value.replace(/,/g, "");
  };

  const onSubmit = async (data: PostActivityType) => {
    data.price = Number(data.price);
    if (!data.subImageUrls || data.subImageUrls.length < 4) {
      Toast.error("소개 이미지를 4개 입력해 주세요.");
      return;
    }
    if (data.subImageUrls.length > 4) {
      Toast.error("소개 이미지는 4개만 입력이 가능합니다.");
      return;
    }
    mutation.mutate(data);
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex justify-between">
        <h2 className="text-[32px] font-bold leading-[42px]">내 체험 등록</h2>
        <Button
          type="submit"
          disabled={!isValid || mutation.isPending}
          isLoading={mutation.isPending}
          size="md"
          onClick={handleSubmit(onSubmit)}
        >
          등록하기
        </Button>
      </div>
      <LabelInput placeholder="제목" {...register("title")} />
      <DropdownInput setValue={(value) => setValue("category", value)} {...register("category")} />
      <Textarea placeholder="설명" {...register("description")} />
      <LabelInput
        label="가격"
        placeholder="가격"
        value={formatWithCommas(watch("price")?.toString() || "")}
        onChange={(e) => {
          const price = removeCommas(e.target.value);
          if (!isNaN(Number(price))) {
            setValue("price", Number(price));
          }
        }}
        type="text"
      />
      <PostInput label={"주소"} watch={watch} setValue={setValue} placeholder="주소를 입력해주세요" />
      <ScheduleList watch={watch} setValue={setValue} />
      <BannerImgForm watch={watch} setValue={setValue} />
      <SubImageForm watch={watch} setValue={setValue} />
    </div>
  );
};

export default CreateActivityForm;
