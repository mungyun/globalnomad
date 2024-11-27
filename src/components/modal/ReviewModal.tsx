"use client";

import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { mockReservations } from "../mockData";
import RenderStars from "./RenderStars";

// interface ReviewModalProps {
//   setIsOpen: (value: boolean) => void;
// }
// const ReviewModal = ({ setIsOpen }: ReviewModalProps) => {
const ReviewModal = () => {
  const activity = mockReservations.reservations[0];

  // const handelClose = () => {
  //   setIsOpen(false);
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50">
      <div className="h-full w-full bg-white p-4 md:fixed md:left-1/2 md:top-1/2 md:h-[750px] md:w-[480px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl md:p-7">
        <header className="mb-5 flex justify-between text-[28px] font-bold md:text-[24px]">
          <h2>후기작성</h2>
          {/* <button type="button" aria-label="닫기" onClick={handelClose}> */}
          <button type="button" aria-label="닫기">
            <AiOutlineClose className="text-gray09" />
          </button>
        </header>

        <div className="mx-auto flex">
          <div className="relative aspect-square w-[100px] md:w-[126px]">
            <Image
              src={activity.activity.bannerImageUrl}
              fill
              className="rounded-xl"
              alt="체험이미지"
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100px, 126px"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between px-3 py-1 md:px-6 md:py-0">
            <div className="flex flex-col gap-1">
              <span className="font-bold md:text-xl">{activity.activity.title}</span>
              <div className="flex gap-2 text-sm md:text-lg">
                <span>{activity.date}</span>
                <span>{activity.startTime}</span>
                <span>{activity.endTime}</span>
                <span>{activity.headCount}명</span>
              </div>
            </div>
            <span className="border-t border-gray02 py-1 text-xl font-bold md:pt-3 md:text-[32px]">
              ₩ {activity.totalPrice.toLocaleString()}
            </span>
          </div>
        </div>
        <RenderStars />
        <form onSubmit={handleSubmit}>
          <textarea
            className="h-[346px] w-full rounded-md border border-gray05 p-4 placeholder:text-gray05 md:h-[240px]"
            placeholder="후기를 작성해주세요"
            required
          />
          <button className="mt-4 w-full rounded-md bg-black02 py-[14px] text-white" type="submit">
            작성하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
