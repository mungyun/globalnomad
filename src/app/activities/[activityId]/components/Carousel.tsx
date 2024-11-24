import Image from "next/image";
import React, { useState } from "react";

interface ImageType {
  src: string;
  alt: string;
}

interface CarouselProps {
  images: ImageType[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative mx-auto w-full">
      <div>
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="h-full w-full object-cover"
          width={375}
          height={310}
        />
      </div>
      <button className="absolute left-4 top-1/2 -translate-y-1/2 transform" onClick={handlePrev}>
        <Image src="/icons/prevbutton.svg" alt="이전 버튼" width={24} height={47} />
      </button>
      <button className="absolute right-4 top-1/2 -translate-y-1/2 transform" onClick={handleNext}>
        <Image src="/icons/nextbutton.svg" alt="다음 버튼" width={24} height={47} />
      </button>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 cursor-pointer rounded-full bg-black opacity-50 ${
              index === currentIndex ? "bg-white opacity-100" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
