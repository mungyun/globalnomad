import { ActiviteForm } from "@/types/ActivityType";
import React, { InputHTMLAttributes, useEffect, useState } from "react";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { FiX } from "react-icons/fi";

interface PostInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  watch: UseFormWatch<ActiviteForm>;
  setValue: UseFormSetValue<ActiviteForm>;
}

const PostInput = ({ label, watch, setValue, ...props }: PostInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const address = watch("address");

  const handleComplete = (data: Address) => {
    setValue("address", data.address);
    setIsOpen(false);
  };

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  // 모달 오픈 시 부모 컴포넌트 스크롤 비활성화
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div>
      <label className="flex flex-col gap-4 text-xl font-bold leading-8 text-black03 md:text-2xl">
        {label}
        <input
          className={`h-[56px] w-full rounded border border-gray08 px-5 py-4 text-base font-normal leading-[26px] outline-green02 placeholder:text-gray06`}
          readOnly
          onClick={toggleModal}
          value={address}
          {...props}
        />
      </label>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10 bg-black opacity-50" onClick={toggleModal} />
          <div className="fixed left-1/2 top-1/2 z-10 flex h-dvh w-full -translate-x-1/2 -translate-y-1/2 flex-col gap-4 bg-white p-3 shadow-sm md:h-[600px] md:max-w-[500px] md:rounded md:border md:p-5">
            <div className="flex justify-between">
              <label className="flex flex-col gap-4 text-xl font-bold leading-8 text-black03 md:text-2xl">
                주소 검색
              </label>
              <FiX className="size-6 text-black03" onClick={toggleModal} />
            </div>
            <DaumPostcodeEmbed theme={{ bgColor: "#ffffff" }} style={{ height: "700px" }} onComplete={handleComplete} />
          </div>
        </>
      )}
    </div>
  );
};

export default PostInput;
