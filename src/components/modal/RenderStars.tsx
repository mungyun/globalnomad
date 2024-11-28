"use client";

import Image from "next/image";
import { useState } from "react";

const RenderStars = () => {
  const [rating, setRating] = useState(0);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isSelected = i <= rating;
      stars.push(
        <button type="button" className="relative h-[56px] w-[56px]" key={i}>
          <Image
            src={isSelected ? "/icons/reviewStar.svg" : "/icons/reviewEmptyStar.svg"}
            fill
            alt={`별점 ${i}`}
            onClick={() => setRating(i)}
          />
        </button>
      );
    }
    return stars;
  };
  return <div className="flex justify-center gap-5 py-8 md:gap-3 md:py-16">{renderStars()}</div>;
};

export default RenderStars;
