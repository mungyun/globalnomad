"use client";

import Pagination from "@/components/Pagination";
import Image from "next/image";
import React, { useState } from "react";
import CommentItem from "./CommentItem";
import { reviewMockData } from "./mockdata";

const CommentList = () => {
  const { averageRating, totalCount, reviews } = reviewMockData;
  const [page, setPage] = useState(1);

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
      <ul>
        {reviews.map((item) => (
          <li key={item.id}>
            <CommentItem item={item} />
          </li>
        ))}
      </ul>
      <Pagination totalCount={totalCount} currentPage={page} setCurrentPage={setPage} />
    </div>
  );
};

export default CommentList;
