import Image from "next/image";
import React, { useState } from "react";

interface ImageType {
  src: string; // 이미지의 URL을 나타내는 문자열
  alt: string; // 이미지의 대체 텍스트
}

interface CarouselProps {
  images: ImageType[]; // 캐러셀에 표시할 이미지 배열
}

const Carousel = ({ images }: CarouselProps) => {
  // 현재 표시 중인 이미지의 인덱스 상태
  const [currentIndex, setCurrentIndex] = useState(0);
  // 애니메이션 진행 중 상태를 나타내는 상태
  const [isAnimating, setIsAnimating] = useState(false);

  // 이전 이미지로 이동하는 핸들러
  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true); // 애니메이션 시작
      setTimeout(() => {
        // 현재 인덱스가 0이면 마지막 이미지로, 그렇지 않으면 이전 이미지로 이동
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
        setIsAnimating(false); // 애니메이션 종료
      }, 300); // 애니메이션 지속 시간 (ms 단위)
    }
  };

  // 다음 이미지로 이동하는 핸들러
  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true); // 애니메이션 시작
      setTimeout(() => {
        // 현재 인덱스가 마지막 이미지면 첫 번째 이미지로, 그렇지 않으면 다음 이미지로 이동
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        setIsAnimating(false); // 애니메이션 종료
      }, 300); // 애니메이션 지속 시간 (ms 단위)
    }
  };

  return (
    <div className="relative mx-auto w-full overflow-hidden">
      {/* 이미지 컨테이너 */}
      <div
        className="flex transition-transform duration-300"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`, // 현재 이미지 인덱스에 따라 이동
        }}
      >
        {/* 이미지 목록 */}
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {/* 이미지 렌더링 */}
            <Image src={image.src} alt={image.alt} className="h-full w-full object-cover" width={375} height={310} />
          </div>
        ))}
      </div>

      {/* 이전 버튼 */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 transform"
        onClick={handlePrev}
        disabled={isAnimating} // 애니메이션 중 버튼 비활성화
      >
        <Image src="/icons/prevbutton.svg" alt="이전 버튼" width={24} height={47} />
      </button>

      {/* 다음 버튼 */}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 transform"
        onClick={handleNext}
        disabled={isAnimating} // 애니메이션 중 버튼 비활성화
      >
        <Image src="/icons/nextbutton.svg" alt="다음 버튼" width={24} height={47} />
      </button>

      {/* 하단 네비게이션 점 */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 cursor-pointer rounded-full bg-black opacity-50 ${
              index === currentIndex ? "bg-white opacity-100" : "" // 현재 인덱스와 같으면 강조
            }`}
            onClick={() => !isAnimating && setCurrentIndex(index)} // 애니메이션 중 클릭 방지
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
