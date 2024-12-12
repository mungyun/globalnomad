import { useCallback, useRef, useState } from "react";

export const useCarousel = () => {
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
      setTimeout(handleScrollEnd, 600);
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
      setTimeout(handleScrollEnd, 600);
    }
  }, [isScrolling, scrollTo, handleScrollEnd]);

  return { carouselRef, scrollToNext, scrollToPrevious, isFirst, isLast };
};
