import Image from "next/image";

interface SizeProps {
  size?: "sm" | "md" | "lg";
  img: string;
  children?: React.ReactNode;
}

export default function ImageBox({ size = "md", img, children }: SizeProps) {
  const sizeProps = {
    sm: "w-[167px] h-[167px] md:w-[206px] md:h-[206px] xl:w-[180px] xl:h-[180px]",
    md: "w-[168px] h-[168px] md:w-[221px] md:h-[221px] xl:w-[283px] xl:h-[283px]",
    lg: "w-[186px] h-[186px] md:w-[384px] md:h-[384px] xl:w-[384px] xl:h-[384px]",
  };

  const baseClass = "flex items-center justify-center overflow-hidden rounded-3xl relative";

  return (
    <div className={`${baseClass} ${sizeProps[size]}`}>
      <Image src={img} fill objectFit="cover" alt="이미지박스" />
      {children && <div className="absolute inset-0">{children}</div>}
    </div>
  );
}
