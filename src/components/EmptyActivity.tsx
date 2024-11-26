import Image from "next/image";

export default function EmptyActivity() {
  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-3">
      <Image src="/icons/emptyActivity.svg" width={200} height={200} alt="빈예약" />
      <h3 className="text-2xl text-gray08">아직 등록한 체험이 없어요</h3>
    </div>
  );
}
