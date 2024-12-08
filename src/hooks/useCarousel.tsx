import { useCallback, useEffect, useRef, useState } from "react";

interface UseCarouselOptions {
  autoScroll?: boolean;
  intervalTime?: number;
}

export const useCarousel = ({ autoScroll = false, intervalTime = 7000 }: UseCarouselOptions) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // 특정 위치로 스크롤 이동
  const scrollTo = useCallback((toPosition: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: toPosition, behavior: "smooth" });
    }
  }, []);

  const handleScrollEnd = useCallback(() => {
    setIsScrolling(false); // 스크롤 완료 후 진행 중 상태를 해제
  }, []);

  // 첫 번째로 스크롤
  const scrollToFirst = useCallback(() => {
    if (!isScrolling) {
      setIsScrolling(true);
      scrollTo(0);
    }
  }, [isScrolling, scrollTo]);

  // 다음으로 스크롤
  const scrollToNext = useCallback(() => {
    if (!isScrolling && carouselRef.current) {
      setIsScrolling(true);

      const carousel = carouselRef.current;
      const itemWidth = carousel.offsetWidth;
      const gap = parseFloat(getComputedStyle(carousel).gap || "0");

      const nextPosition = carousel.scrollLeft + itemWidth + gap;
      const isAtEnd = nextPosition + carousel.offsetWidth + gap >= carousel.scrollWidth;

      if (isAtEnd) setIsLast(true);
      setIsFirst(false);
      scrollTo(nextPosition);
      setTimeout(handleScrollEnd, 700);
    }
  }, [isScrolling, scrollTo, handleScrollEnd]);

  // 이전으로 스크롤
  const scrollToPrevious = useCallback(() => {
    if (!isScrolling && carouselRef.current) {
      setIsScrolling(true);

      const carousel = carouselRef.current;
      const itemWidth = carousel.offsetWidth;
      const gap = parseFloat(getComputedStyle(carousel).gap || "0");

      const previousPosition = carousel.scrollLeft - (itemWidth + gap);
      const isAtStart = previousPosition <= 0;

      if (isAtStart) setIsFirst(true);
      setIsLast(false);
      scrollTo(previousPosition);
      setTimeout(handleScrollEnd, 700);
    }
  }, [isScrolling, scrollTo, handleScrollEnd]);

  // 자동 스크롤 효과
  useEffect(() => {
    if (!autoScroll) return;

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const carousel = carouselRef.current;
        const isAtEnd = carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth;

        if (isAtEnd) {
          scrollToFirst();
        } else {
          scrollToNext();
        }
      }
    }, intervalTime);

    return () => clearInterval(interval); // 언마운트 시 정리
  }, [autoScroll, intervalTime, scrollToFirst, scrollToNext]);

  return { carouselRef, scrollToFirst, scrollToNext, scrollToPrevious, isFirst, isLast };
};
