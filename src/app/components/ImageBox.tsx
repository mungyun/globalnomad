import Image from "next/image";

interface SizeProps {
  size?: "sm" | "md" | "lg";
  img: string;
  children?: React.ReactNode;
}

export default function ImageBox({ size = "md", img, children }: SizeProps) {
  const sizeProps = {
    sm: "size-[167px] md:size-[206px] xl:size-[180px]",
    md: "size-[168px] md:size-[221px] xl:size-[283px]",
    lg: "size-[186px] md:size-[384px] xl:size-[384px]",
  };

  const baseClass = "flex items-center justify-center overflow-hidden rounded-3xl relative";

  return (
    <div className={`${baseClass} ${sizeProps[size]}`}>
      <Image src={img} fill objectFit="cover" alt="이미지박스" />
      {children && <div className="absolute inset-0">{children}</div>}
    </div>
  );
}
