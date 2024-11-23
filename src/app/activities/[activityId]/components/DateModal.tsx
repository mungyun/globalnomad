const DateModal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-0 z-10 h-[599px] w-[480px] rounded-3xl bg-white px-6 py-8 shadow-md">
      <button
        className="absolute right-3 top-3 text-[20px] font-bold text-gray09"
        onClick={onClose}
        aria-label="모달 닫기"
      >
        &times;
      </button>
      {children}
      <button className="h-[56px] w-full rounded bg-black02 text-[16px] font-bold text-white md:mt-8 xl:mt-6">
        예약하기
      </button>
    </div>
  );
};

export default DateModal;
