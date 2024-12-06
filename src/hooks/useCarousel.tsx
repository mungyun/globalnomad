import { useCallback, useEffect, useRef } from "react";

interface UseCarouselOptions {
  autoScroll?: boolean;
  intervalTime?: number;
}

export const useCarousel = ({ autoScroll = false, intervalTime = 7000 }: UseCarouselOptions) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // 특정 위치로 스크롤 이동
  const scrollTo = useCallback((toPosition: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: toPosition, behavior: "smooth" });
    }
  }, []);

  // 첫 번째로 스크롤
  const scrollToFirst = useCallback(() => {
    scrollTo(0);
  }, [scrollTo]);

  // 다음으로 스크롤
  const scrollToNext = useCallback(() => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      const nextPosition = carousel.scrollLeft + carousel.offsetWidth;
      scrollTo(nextPosition);
    }
  }, [scrollTo]);

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

  return { carouselRef, scrollToFirst, scrollToNext };
};
