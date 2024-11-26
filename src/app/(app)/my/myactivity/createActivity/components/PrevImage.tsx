import Image from "next/image";
import { FiX } from "react-icons/fi";

interface ImageProps {
  clearImage: () => void;
  imageFile: Blob | MediaSource;
}

const PrevImage = ({ imageFile, clearImage }: ImageProps) => {
  return (
    <div className="relative aspect-square w-auto">
      <Image fill src={URL.createObjectURL(imageFile)} alt="Preview" className="rounded-xl object-cover" />
      <button
        type="button"
        onClick={clearImage}
        className="absolute right-0 top-0 flex size-6 -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-black03 opacity-80 md:size-8 xl:size-10"
      >
        <FiX className="size-5 md:size-7 xl:size-9" color="white" />
      </button>
    </div>
  );
};

export default PrevImage;
