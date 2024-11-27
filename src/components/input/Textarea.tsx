import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: "lg" | "md";
}

const sizeClass = {
  lg: "h-[346px]",
  md: "h-[240px]",
};

const Textarea = ({ size = "lg", ...props }: TextareaProps) => {
  return (
    <textarea
      className={`w-full resize-none rounded border border-gray08 p-4 outline-green02 ${sizeClass[size]}`}
      {...props}
    />
  );
};

export default Textarea;
