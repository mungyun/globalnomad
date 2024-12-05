"use client";

import Pagination from "@/components/Pagination";
import { getReviews } from "@/lib/api/Activities";
import { ReviewData } from "@/types/ActivityType";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import CommentItem from "./CommentItem";

const CommentList = ({ activityId }: { activityId: number }) => {
  const [page, setPage] = useState(1);
  const {
    data: reviewData,
    isLoading,
    error,
  } = useQuery<ReviewData, Error>({
    queryKey: ["reviewData", activityId],
    queryFn: () => getReviews({ activityId: Number(activityId) }),
    enabled: !!activityId,
    staleTime: 60 * 5 * 1000,
  });

  // 로딩 상태 처리
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 오류 처리
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!reviewData) {
    return <div>리뷰 데이터가 없습니다.</div>;
  }

  const { averageRating, totalCount, reviews } = reviewData;
  return (
    <div className="mt-10">
      <h3 className="mb-6 text-[18px] font-bold">후기</h3>
      <div className="mb-6 flex items-start gap-4">
        <span className="h-[60px] text-[50px] font-semibold text-black02">{averageRating}</span>
        <div className="flex flex-col gap-2 text-[18px] text-black02">
          <span>매우 만족</span>
          <div className="flex">
            <Image src="/icons/star.svg" alt="평점" width={16} height={16} />
            <span>{totalCount}개 후기</span>
          </div>
        </div>
      </div>
      {reviews.length === 0 ? (
        <p className="h-[100px] text-[18px]">등록된 리뷰가 없습니다.</p>
      ) : (
        <ul>
          {reviews.map((item) => (
            <li key={item.id}>
              <CommentItem item={item} />
            </li>
          ))}
        </ul>
      )}
      <Pagination totalCount={totalCount} currentPage={page} setCurrentPage={setPage} />
    </div>
  );
};

export default CommentList;
