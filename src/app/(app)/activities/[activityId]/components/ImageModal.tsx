import Image from "next/image";
import React from "react";

const ImageModal = ({ selectedImage, onClose }: { selectedImage: string; onClose: () => void }) => {
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
        <div className="relative">
          <Image src={selectedImage} alt="확대된 이미지" width={800} height={600} className="rounded-xl object-cover" />
          <button onClick={onClose} className="absolute right-2 top-2 rounded-full bg-white">
            <Image src="/icons/X.svg" width={30} height={30} alt="닫기" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
