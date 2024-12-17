"use client";

import { postReview } from "@/lib/api/MyReservation";
import { Reservation } from "@/types/MyReservationType";
import formatPrice from "@/utils/formatPrice";
import { Review, ReviewSchema } from "@/zodSchema/reservationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { useToast } from "../toast/ToastProvider";
import RenderStars from "./RenderStars";

interface ReviewModalProps {
  setIsModalOpen: (value: boolean) => void;
  reservation: Reservation;
}

const ReviewModal = ({ setIsModalOpen, reservation }: ReviewModalProps) => {
  const Toast = useToast();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { isValid, isSubmitting },
  } = useForm<Review>({
    resolver: zodResolver(ReviewSchema),
    mode: "onChange",
  });

  const handelClose = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<Review> = async (data) => {
    try {
      await postReview({ reservationId: reservation.id, rating: data.rating, content: data.content });
      setIsModalOpen(false);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        Toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="h-full w-full bg-white p-4 md:fixed md:left-1/2 md:top-1/2 md:h-[750px] md:w-[480px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl md:p-7">
        <header className="mb-5 flex justify-between text-[28px] font-bold md:text-[24px]">
          <h2>후기작성</h2>
          <button type="button" aria-label="닫기" onClick={handelClose}>
            <AiOutlineClose className="text-gray09" />
          </button>
        </header>

        <div className="mx-auto flex">
          <div className="relative aspect-square w-[100px] md:w-[126px]">
            <Image
              src={reservation.activity.bannerImageUrl}
              fill
              className="rounded-xl"
              alt="체험이미지"
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100px, 126px"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between px-3 py-1 md:px-6 md:py-0">
            <div className="flex flex-col gap-1">
              <span className="font-bold md:text-xl">{reservation.activity.title}</span>
              <div className="flex gap-2 text-sm md:text-lg">
                <span>{reservation.date}</span>
                <span>{reservation.startTime}</span>
                <span>{reservation.endTime}</span>
                <span>{reservation.headCount}명</span>
              </div>
            </div>
            <span className="border-t border-gray02 py-1 text-xl font-bold md:pt-3 md:text-[32px]">
              ₩ {formatPrice(reservation.totalPrice)}
            </span>
          </div>
        </div>
        <RenderStars setValue={setValue} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            className="h-[346px] w-full rounded-md border border-gray05 p-4 placeholder:text-gray05 md:h-[240px]"
            placeholder="후기를 작성해주세요"
            {...register("content", { required: "후기를 작성해주세요" })}
          />
          <button
            className="mt-4 w-full rounded-md bg-black02 py-[14px] text-white"
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            작성하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
