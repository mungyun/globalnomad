import Image from "next/image";
import React, { useEffect } from "react";

const ImageModal = ({ selectedImage, onClose }: { selectedImage: string; onClose: () => void }) => {
  useEffect(() => {
    // 모달이 열릴 때 스크롤 방지
    document.body.style.overflow = "hidden";

    return () => {
      // 모달이 닫힐 때 스크롤 복원
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
        <div className="relative">
          {/* 확대된 이미지 */}
          <Image src={selectedImage} alt="확대된 이미지" width={800} height={600} className="rounded-xl object-cover" />
          {/* 닫기 버튼 */}
          <button onClick={onClose} className="absolute right-2 top-2 rounded-full bg-white">
            <Image src="/icons/X.svg" width={30} height={30} alt="닫기" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
