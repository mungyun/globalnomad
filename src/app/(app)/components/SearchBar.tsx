"use client";

import { Query, SearchSchema } from "@/zodSchema/searchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import SearchButton from "./SearchButton";

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<Query>({
    resolver: zodResolver(SearchSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Query> = (data) => {
    const query = data.query; // 폼 데이터에서 query 값을 추출
    if (query) {
      router.push(`/?query=${query}`); // query 값이 있을 경우 해당 값으로 페이지 이동
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="absolute -top-[60px] left-1/2 w-[calc(100%-32px)] max-w-[1200px] -translate-x-1/2 rounded-2xl bg-background px-6 py-4 shadow-[0_4px_16px_#1122110D] md:w-[calc(100%-48px)] md:py-8 xl:w-full"
    >
      <label className="flex flex-col gap-[15px] font-bold leading-[26px] text-black02 md:gap-8">
        무엇을 체험하고 싶으신가요?
        <div className="relative flex items-center gap-3">
          <Image src="/icons/search.svg" width={48} height={48} alt="검색 아이콘" className="absolute left-0 top-1" />
          <label
            htmlFor="query"
            className={`t absolute left-12 -translate-y-1/2 bg-background text-sm font-normal text-gray06 transition-all md:left-10 md:px-[10px] md:text-base ${
              isFocused ? "top-0" : "top-1/2"
            }`}
          >
            내가 원하는 체험은
          </label>
          <input
            id="query"
            type="text"
            {...register("query")}
            autoComplete="off"
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => setIsFocused(e.target.value !== "")}
            className="h-14 w-full rounded-[4px] border border-gray08 pl-12 text-sm font-normal focus:outline-none md:text-base"
            aria-label="검색어 입력"
          />
          <SearchButton type="submit" disabled={isSubmitting || !isValid} aria-label="검색하기 버튼">
            검색하기
          </SearchButton>
        </div>
      </label>
    </form>
  );
};

export default SearchBar;
